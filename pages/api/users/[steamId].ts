import { NextApiRequest, NextApiResponse } from 'next';
import { QueryError, FieldPacket, RowDataPacket, PoolConnection } from "mysql2"
import pool from "../../../utils/mysql";
import logger from "../../../utils/logger";
import os from "os";

const scriptName: string = __filename.slice(__dirname.length + 1);

export default ( req: NextApiRequest, res: NextApiResponse ) => {
    return new Promise(resolve => {
        const {
            query: { steamId },
        } = req;

        pool.getConnection(( error, connection: PoolConnection ) => {
            if(error) {
                logger(`Błąd łączenia z bazą MySql (zwracanie użytkownika | klient: ${steamId}) (${scriptName}): ${os.EOL} ${JSON.stringify(error)}`);

                res.status(503).send(error);
                return resolve(503);
            }
    
            connection.query('CREATE TABLE IF NOT EXISTS `server-skins_users` (steamID VARCHAR(64) UNIQUE, name VARCHAR(64), credits INT NULL, tradeUrl VARCHAR(128));');
            connection.query('CREATE TABLE IF NOT EXISTS `server-skins_trades-history` (tradeId VARCHAR(128), steamID VARCHAR(64), price INT, itemName VARCHAR(128), tradeUrl VARCHAR(128), status INT);');
    
            connection.query(
                'SELECT * FROM `server-skins_users` WHERE steamID=?',
                [ steamId ],
                ( error: QueryError, result: RowDataPacket[], fields: FieldPacket[] ) => {
                    if(error) {
                        logger(`Błąd zapytania (zwracanie użytkownika | klient: ${steamId}) (${scriptName}): ${os.EOL} ${JSON.stringify(error)}`);

                        connection.release();
                        console.log(error);

                        res.status(503).send(error);
                        return resolve(503);
                    } 
    
                    if(result[0]){
                        connection.release();
                        logger(`Pomyślnie zwrócono użytkownika (klient: ${steamId}) (${scriptName}): ${os.EOL} ${JSON.stringify(result[0])}`);

                        res.status(200).send(result[0]);
                        return resolve(200);
                    }

                    connection.query(
                        'INSERT INTO `server-skins_users` ( steamID, name, credits, tradeUrl) VALUES(?, "WebUser", 0, "")',
                        [ steamId ],
                        ( error: QueryError, result: RowDataPacket[], fields: FieldPacket[] ) => {
                            if(error) {
                                connection.release();
                                console.log(error);
                                logger(`Błąd zapytania (dodawanie użytkownika do bazy | klient: ${steamId}) (${scriptName}): ${os.EOL} ${JSON.stringify(error)}`);

                                res.status(503).send(error);
                                return resolve(503);
                            } 

                            res.status(200).send({
                                steamID: steamId,
                                name: "",
                                credits: 0,
                                tradeUrl: ""
                            });
                            
                            logger(`Pomyślnie dodano użytkownika do bazy (klient: ${steamId}) (${scriptName}): ${os.EOL} ${JSON.stringify(error)}`);

                            connection.release();
                            return resolve(200);
                        }
                    )
                }
            );
        })
    })
}