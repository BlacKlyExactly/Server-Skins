import passport from "passport";
import SteamStrategy from "passport-steam";

const url: string = `http://localhost:${process.env.PORT || 3000}`;

passport.serializeUser(( user: any, done: any ) => {
    done(null, user);
});
  
passport.deserializeUser(( obj: any, done: any ) => {
    done(null, obj);
});

passport.use(
    new SteamStrategy({
        returnURL: `/api/return`,
        realm: `/`,
        apiKey: process.env.WEB_API_KEY
    },
    ( identifier, profile, done ) => {
        done(null, profile);
    }
));


export default passport.authenticate('steam', { failureRedirect: "/authenticate" });