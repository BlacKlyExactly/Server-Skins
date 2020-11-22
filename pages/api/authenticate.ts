import passport from "passport";
import SteamStrategy from "passport-steam";
import url from "../../utils/adress";

passport.serializeUser(( user: any, done: any ) => {
    done(null, user);
});
  
passport.deserializeUser(( obj: any, done: any ) => {
    done(null, obj);
});

passport.use(
    new SteamStrategy({
        returnURL: `${url}/api/return`,
        realm: `${url}/`,
        apiKey: process.env.WEB_API_KEY
    },
    ( identifier, profile, done ) => {
        done(null, profile);
    }
));


export default passport.authenticate('steam', { failureRedirect: "/authenticate" });