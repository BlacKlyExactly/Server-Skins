import SteamUser from "steam-user";
import SteamTotp from 'steam-totp';
import SteamCommunity from 'steamcommunity';
import TradeOfferManager from 'steam-tradeoffer-manager';
import pool from "../utils/mysql";
import { PoolConnection, RowDataPacket, FieldPacket, QueryError } from "mysql2";
import connection from "../utils/mysql";
import axios from "axios";
import TradeStatus from "./status";

const { ACCOUNT_NAME, ACCOUNT_PASSWORD, SHARED_SECRET, IDENTITY_SECRET } = process.env;
const url: string = `http://localhost:${process.env.PORT ? process.env.PORT : 3000}`;

class TradeBot {
    public client;
    public community;
    public manager;

    private accountName: string;
    private accountPassword: string;
    private sharedSecret: string;
    private identitySecret: string;

    public constructor( accountName: string, accountPassword: string, sharedSecret: string, identitySecret: string ){
        this.accountName = accountName;
        this.accountPassword = accountPassword;
        this.sharedSecret = sharedSecret;
        this.identitySecret = identitySecret;
        this.client = new SteamUser();
        this.community = new SteamCommunity();
        this.manager = new TradeOfferManager({
            steam: this.client,
            community: this.community,
            language: 'pl'
        });
    }

    public logOn = () => {
        this.client.logOn({
            accountName: this.accountName,
            password: this.accountPassword,
            twoFactorCode: SteamTotp.generateAuthCode(this.sharedSecret),
            logonID: Math.floor(Math.random() * 10000000) + 1
        })

        this.client.on('loggedOn', () => {
            console.log("[Sklep] > Bot zalogowany");
        
            this.client.setPersona(1);
            this.client.gamesPlayed('[How2kill] Skiny');
        })

        bot.manager.on("sentOfferChanged", async ( offer: any ) => {
            console.log(offer.state);
            try {
                const trade: any = await this.findTradeById(offer.id);
        
                try {
                    const user: any = await axios.get(`${url}/api/users/${trade.steamID}`);
                    console.log(user);

                    if(offer.state === 3){
                        axios.get(`${url}/api/users/setcredits/${trade.steamID}&${user.data.credits - trade.price}`);
                        this.updateTrade(offer.id, TradeStatus.Accepted);
                    }

                    else if (offer.state === 2) this.updateTrade(offer.id, TradeStatus.Pending);

                    else this.updateTrade(offer.id, TradeStatus.Canceled);
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
        })
    }

    public logOff = () => this.client.logOff();

    public setCookies = ( cookies: any ) => {
        this.manager.setCookies(cookies);
        this.community.setCookies(cookies);
        this.community.startConfirmationChecker(20000, this.identitySecret);
    }

    public makeTrade = async ( tradeUrl: string, itemCid: string ) => {
        return new Promise(( resolve, reject ) => {
            this.manager.loadInventory(730, 2, true, ( err, inventory ) => {
                if(err) console.log(err);
                
                else{
                    const offer = this.manager.createOffer(tradeUrl);
                    const tradeItem = inventory.find(item => item.classid === itemCid);

                    if(!tradeItem){
                        reject("Not found");
                        console.log("Item not found");
                        return;
                    }
                    
                    offer.addMyItem(tradeItem);
                    offer.setMessage(`[How2Kill] Sklep > przedmiot: ${tradeItem.name}`);
                    offer.send((err, status) => {
                        if(err){
                            console.log(err);
                            reject(err);
                        }  

                        else {
                            console.log('[Sklep] > wysłano ofertę');
                            console.log(status);

                            resolve({ offer, tradeItem });
                        }
                    })
                }
            })
        })
    }

    public findTradeById = async ( tradeid: string ) => {
        return new Promise(( resolve, reject ) => {
            pool.getConnection(( error, connection: PoolConnection ) => {
                if(error){
                    console.log(error);
                    reject(error);
                    return;
                }
            })
    
            connection.query(
                'SELECT * FROM `server-skins_trades` WHERE `tradeId`=?',
                [ tradeid ],
                ( error: QueryError, result: RowDataPacket[], fields: FieldPacket[] ) => {
                    if(error){
                        console.log(error);
                        reject(error);
                        return;
                    }
    
                    if(!result[0]){
                        reject("Not found");
                        return;
                    }

                    resolve(result[0]);
                }
            )
        })
    }

    public updateTrade = async ( tradeid: string, status: number ) => {
        return new Promise(( resolve, reject ) => {
            pool.getConnection(( error, connection: PoolConnection  ) => {
                if(error){
                    console.log(error);
                    reject(error);
                    return;
                }
            })
    
            connection.query(
                'UPDATE `server-skins_trades` SET `status`=? WHERE `tradeId`=?',
                [ status, tradeid ],
                ( error: QueryError, result: RowDataPacket[], fields: FieldPacket[] ) => {
                    if(error){
                        console.log(error);
                        reject(error);
                        return;
                    }

                    resolve("done");
                }
            )
        })
    }
}

const bot: TradeBot = new TradeBot(ACCOUNT_NAME, ACCOUNT_PASSWORD, SHARED_SECRET, IDENTITY_SECRET);

bot.logOn();

export default bot;



