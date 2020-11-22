import { NextApiRequest, NextApiResponse } from 'next';
import { QueryError, FieldPacket, RowDataPacket, PoolConnection } from "mysql2"
import pool from "../../../../utils/mysql";
import logger from "../../../../utils/logger";
import os from "os";

const scriptName: string = __filename.slice(__dirname.length + 1);

export default ( req: NextApiRequest, res: NextApiResponse ) => {
    return new Promise(resolve => {
        const {
            query: { data },
        } = req;

        if(data instanceof Array){
            logger(`Podano tablicę do parametru (${scriptName})`);

            res.status(503).send(503);
            return resolve(503);
        }

        const queryData: Array<string> = data.split("&");
        const [ steamId, partner, token ] = queryData;

        if(!steamId || !partner || !token){
            logger(`Podano nieprawidłowy trade URL (${scriptName})`);

            res.status(503).send(503);
            return resolve(503);
        }

        pool.getConnection(( error, connection: PoolConnection ) => {
            if(error){
                logger(`Błąd łączenia z bazą MySql (ustawianie trade URL | klient: ${steamId}, partner: ${partner}, token: ${token}) (${scriptName}):${os.EOL} ${JSON.stringify(error)}`);

                res.status(503).send(503);
                return resolve(503);
            }
            
            connection.query(
                'UPDATE `server-skins_users` SET `tradeUrl`=? WHERE steamID=?',
                [ `https://steamcommunity.com/tradeoffer/new/?partner=${partner}&token=${token}`, steamId ],
                ( error: QueryError, result: RowDataPacket[], fields: FieldPacket[] ) => {
                    if(error){
                        connection.release();

                        console.log(queryData);
                        logger(`Błąd zapytania (ustawianie trade URL | klient: ${steamId}, partner: ${partner}, token: ${token}) (${scriptName}):${os.EOL} ${JSON.stringify(error)}`);

                        res.status(404).end();
                        return resolve(404);
                    } 

                    connection.release();
                    res.status(200).send(200);

                    return resolve(200);
                }
            );
        })
    })
}