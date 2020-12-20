import passport from "passport";
import SteamStrategy from "passport-steam";

passport.serializeUser(( user: any, done: any ) => {
    done(null, user);
});
  
passport.deserializeUser(( obj: any, done: any ) => {
    done(null, obj);
});

passport.use(
    new SteamStrategy({
        returnURL: `http://www.sklep.how2kill.pl/api/return`,
        realm: `http://www.sklep.how2kill.pl/`,
        apiKey: process.env.WEB_API_KEY
    },
    ( identifier, profile, done ) => {
        profile.identifier = identifier;    
        done(null, profile);
    }
));


export default passport.authenticate('steam', { failureRedirect: "/authenticate" });