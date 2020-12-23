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
            query: { steamId },
        } = req;

        pool.getConnection(( error, connection: PoolConnection ) => {
            if(error) {
                logger(`Błąd łączenia z bazą MySql (zwracanie użytkownika | klient: ${steamId}) (${scriptName}): ${os.EOL} ${JSON.stringify(error)}`);

                res.status(503).send(error);
                return resolve(503);
            }

            connection.query(
                'SELECT * FROM `server-skins_trades-history` WHERE steamID=?',
                [ steamId ],
                ( error: QueryError, result: RowDataPacket[], fields: FieldPacket[] ) => {
                    if(error) {
                        logger(`Błąd zapytania (zwracanie wymian | klient: ${steamId}) (${scriptName}): ${os.EOL} ${JSON.stringify(error)}`);

                        connection.release();
                        console.log(error);

                        res.status(503).send(error);
                        return resolve(503);
                    } 
    
                    if(!result[0]){
                        connection.release();
                        logger(`Nie znaleziono wymian (klient: ${steamId}) (${scriptName}): ${os.EOL} ${JSON.stringify(result[0])}`);

                        res.status(503).send(error);
                        return resolve(503);
                    }
                    
                    connection.release();
                    res.status(200).send(result);
                    return resolve(200);
                }
            );
        })
    })
}