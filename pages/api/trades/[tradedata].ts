import { NextApiRequest, NextApiResponse } from 'next';
import { PoolConnection, QueryError, RowDataPacket, FieldPacket } from "mysql2";
import axios, { AxiosResponse } from 'axios';
import logger from "../../../utils/logger";
import bot from "../../../utils/bot";
import TradeStatus from "../../../utils/status";
import pool from "../../../utils/mysql";
import os from "os";
import NextCors from 'nextjs-cors';

const scriptName: string = __filename.slice(__dirname.length + 1);
let isLogged: boolean = false;

export default async ( req: NextApiRequest, res: NextApiResponse ) => {
    await NextCors(req, res, {
        methods: ['GET'],
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
    });

    return new Promise(async ( resolve ) => {
        const {
            query: { tradedata },
        } = req;
		
        if(tradedata instanceof Array){
            logger(`Podano tablicę do parametru (${scriptName})`)

            res.status(503).send(503);
            return resolve(503);
        }

        const queryData: Array<string> = tradedata.split("&");
        const [ steamId, itemCid, price ] = queryData;

        const createTrade = async () => {
            try{
                const response: AxiosResponse = await axios.get(`http://localhost:3000/api/users/${steamId}`);
                const tradeUrl: string = response.data.tradeUrl;
               
                try{
                    const trade: any = await bot.makeTrade(tradeUrl, itemCid);
                    const { offer, tradeItem } = trade;
    
                    pool.getConnection(( error, connection: PoolConnection ) => {
                        if(error){
                            logger(`Błąd łączenia z bazą MySql (zapisywanie wymiany | klient: ${steamId}) (${scriptName}):${os.EOL} ${JSON.stringify(error)}`);
            
                            res.status(503).send(503);
                            return resolve(503);
                        }
    
                        connection.query(
                            "INSERT INTO `server-skins_trades-history` (`tradeId`, `steamID`, `price`, `itemName`, `tradeUrl`, `status`) VALUES(?, ?, ?, ?, ?, ?)",
                            [ offer.id, steamId, price, tradeItem.name, tradeUrl, TradeStatus.Pending ],
                            ( error: QueryError, result: RowDataPacket[], fields: FieldPacket[] ) => {
                                if(error){
                                    connection.release();
                                    logger(`Błąd zapisywania wymiany (klient: ${steamId}) (${scriptName}):${os.EOL} ${JSON.stringify(error)}`);
                    
                                    res.status(503).send(503);
                                    return resolve(503);
                                }
                                
                                connection.release();
                                res.status(200).send(offer);
                                return resolve(200);
                            }
                        )
                    })
                } catch (error) {
                    logger(`Bład wysyłania oferty (wymiana klienta ${steamId})) (${scriptName}): ${os.EOL} ${JSON.stringify(error)}`);
    
                    res.status(503).send(error);
                    return resolve(503);
                }
            } catch (error) {
                console.log(error);
                logger(`Bład pobierania klienta (wymiana klienta ${steamId})) (${scriptName}): ${os.EOL} ${JSON.stringify(error)}`);
                
                res.status(503).send(error);
                return resolve(503);
            }
        }
        
        isLogged && createTrade();
    
        bot.client.on('webSession', async ( sid, cookies ) =>{
            bot.setCookies(cookies);
            createTrade();

            isLogged = true;
        });
    })
}