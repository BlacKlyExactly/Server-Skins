import { NextApiRequest, NextApiResponse } from 'next';
import cacheData from "memory-cache";
import logger from "../../../utils/logger";
import os from "os";
import NextCors from 'nextjs-cors';

const scriptName: string = __filename.slice(__dirname.length + 1);

import {
    Currency,
    Application,
} from '@node-steam/data';

import {
    Market,
} from '@node-steam/market-pricing';

const sleep = ( ms: number ) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
} 

export default async ( req: NextApiRequest, res: NextApiResponse ) => {
    await NextCors(req, res, {
        methods: ['GET'],
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
    });

    return new Promise(async ( resolve: any ) => {
        const {
            query: { hashName },
        } = req;

        if(hashName instanceof Array) {
                logger(`Podano tablicę do parametru (${scriptName})`)

                res.status(503);
                return resolve(503);
        }
        
        const params = hashName.split("&");

        const name: string = unescape(params[0]);
        const index: number = parseInt(params[1]);

        try {
            const value = cacheData.get(name);
            const time: number = 86400000;

            if(value){
                console.log(`Cached ${name}`);
                logger(`Cena dla ${name} jest już zapisana (${scriptName})`);

                res.status(200).send(value);
                return resolve(200);
            }
            
            await sleep(index * 4000);

            console.log(`Not cached ${name}`);
            logger(`Zapisywanie ceny dla ${name} (${scriptName})`);

            const API = new Market({ id: Application.CSGO, currency: Currency.PLN });
            const price = await API.getPrice(name);
    
            cacheData.put(name, price.price, time);
            
            res.status(200).send(price.price);
            return resolve(200);
        } 
        catch (error) {
            console.log(error);
            logger(`Błąd zapisywania ceny dla ${name} (${scriptName}): ${os.EOL} ${JSON.stringify(error)}`);

            res.status(404).send(error);
            return resolve(404);
        }
    })
}
