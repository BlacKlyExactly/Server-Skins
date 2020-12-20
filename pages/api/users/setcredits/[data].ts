import { NextApiRequest, NextApiResponse } from 'next';
import { QueryError, FieldPacket, RowDataPacket, PoolConnection } from "mysql2"
import pool from "../../../../utils/mysql";
import logger from "../../../../utils/logger";
import os from "os";
import NextCors from 'nextjs-cors';

const scriptName: string = __filename.slice(__dirname.length + 1);

export default async ( req: NextApiRequest, res: NextApiResponse ) => {
    await NextCors(req, res, {
        methods: ['GET'],
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
    });

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
        const [ steamId, value ] = queryData;

        pool.getConnection(( error, connection: PoolConnection ) => {
            if(error) {
                logger(`Błąd łączenia z bazą MySql (ustawianie kredytów | klient: ${steamId}, wartość ${value}) (${scriptName}):${os.EOL} ${JSON.stringify(error)}`);

                res.status(503).send(error);
                return resolve(error);
            }
            
            console.log(steamId);

            connection.query(
                'UPDATE `server-skins_users` SET `credits`=? WHERE steamID=?',
                [ parseInt(value), steamId ],
                ( error: QueryError, result: RowDataPacket[], fields: FieldPacket[] ) => {
                    if(error) {
                        logger(`Błąd zapytania (ustawianie kredytów | klient: ${steamId}, wartość ${value}) (${scriptName}):${os.EOL} ${JSON.stringify(error)}`);
                        connection.release();

                        res.send("503");
                        console.log(error);

                        res.status(404).end();
                        return resolve(404);
                    } 

                    connection.release();
                    res.status(200).send(200);
                    logger(`Pomyślnie ustawiono kredyty (klient: ${steamId}, wartość ${value}) (${scriptName}):${os.EOL} ${JSON.stringify(error)}`);

                    return resolve(200);
                }
            );
        })
    })
}