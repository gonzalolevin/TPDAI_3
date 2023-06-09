import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import "dotenv/config";

//el issuer es quien valido el token
//está validando que el token haya sido creado por quien deberia ser
const opt = {
    secretOrKey: process.env.AUTH_HS256_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    issuer: `${process.env.ISSUER_URL}`,
    algorithms: ["HS256"], //algoritmo de encriptacion
};

//cuando devuelve unauthorized, es porque está devolviendo true
//cuando devuelve false, le pasa ademas el token
const jwtStrategy = new Strategy(opt, (jwt_payload, done) =>{
    if (!jwt_payload) {
        done(true);
    } else {
        done(null, jwt_payload);
    }
});

//esta funcion esta decriptando el token, lo vuelve a poner en forma objeto
//lo pasa del string al objeto nuevamente
export const Authenticate = (req, res, next) => {
    passport.authenticate(jwtStrategy, (err, user) => {
    console.log(user);
    if(err) res.status(401).send({message: "Unauthorized" });
    if (!user) res.status(401).send({message: "Unauthorized"});
    else {
        next();
    }
    })(req, res, next);
};