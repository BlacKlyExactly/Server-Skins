import { NextApiRequest, NextApiResponse } from 'next';
import { serialize, CookieSerializeOptions } from "cookie";
import passport from "passport";
import SteamID from "steamid";
import jwt from "jsonwebtoken";
import logger from "../../utils/logger";
import os from "os";

const scriptName: string = __filename.slice(__dirname.length + 1);

export default ( req: NextApiRequest, res: NextApiResponse ) => {
    passport.authenticate('steam', ( err, user, info ) => {
        err && logger(`Błąd zapisywania jwt (${scriptName}):${os.EOL} ${JSON.stringify(err)}`);

        const id: SteamID = new SteamID(user.id);
        
        const steamId: string = id.getSteam2RenderedID(true);
        const name: string = user.displayName;
        const avatar: string = user.photos[2].value;

        const data = {
            name,
            avatar,
            steamId
        }

        const options: CookieSerializeOptions = {
            httpOnly: true,
            path: "/"
        }

        const accessToken: string = jwt.sign(data, process.env.COOKIES_SECRET, { expiresIn: 604800 });
        res.setHeader('Set-Cookie', serialize("token", accessToken, options));

        res.redirect('/');
    })( req, res )
}
