import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from "axios";
import cacheData from "memory-cache";
import logger from "../../utils/logger";
import os from "os";
import url from "../../utils/adress";

const scriptName: string = __filename.slice(__dirname.length + 1);

export default async( req: NextApiRequest, res: NextApiResponse ) => {
    try {
        const value = cacheData.get(process.env.BOT_PROFILE_ID);
        const time: number = 86400000;

        if(value) {
            logger(`Ekwipunek ${process.env.BOT_PROFILE_ID} jest już zapisany (${scriptName})`);

            res.send(value);
            return;
        }

        const response: AxiosResponse = await axios.get(
        	`https://steamcommunity.com/profiles/${process.env.BOT_PROFILE_ID}/inventory/json/730/2`
        );
        
        cacheData.put(process.env.BOT_PROFILE_ID, response.data, time);
        logger(`Zapisywanie ekwipunku ${process.env.BOT_PROFILE_ID} (${scriptName})`);

        res.send(response.data);
    } catch (error) {
        logger(`Błąd zapisywanie ekwipubku ${process.env.BOT_PROFILE_ID} (${scriptName}):${os.EOL} ${JSON.stringify(error)}`);
        res.send(error);
    }
};