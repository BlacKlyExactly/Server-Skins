import { GetServerSidePropsContext } from "next";
import nextCookie from "next-cookies";
import jwt from "jsonwebtoken";

const useAuth = ( ctx: GetServerSidePropsContext ) => {
    const { token } = nextCookie(ctx);
    const accessToken: string | null = token ? token : null;
    const isLoged: boolean = token ? true : false;

    const data: any = accessToken ? jwt.verify(accessToken, process.env.COOKIES_SECRET) : null;
    return [ accessToken, isLoged, data ];
}

export interface UserData {
    name: string,
    avatar: string, 
    steamId: string
}

export default useAuth;