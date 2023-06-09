import express from "express";
import PersonajeRouter from "./Controller/personajeController.js";
import PeliculaRouter from "./Controller/peliculaController.js";
import AuthentificationRouter from "./Controller/authentificationController.js";
import "dotenv/config";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
const app = express();
const port = 3000;


app.use(express.json());

const opt = {
    secretOrKey: process.env.AUTH_HS256_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    issuer: `${process.env.ISSUER_URL}`,
    algorithms: ["HS256"],
};

const jwtStrategy = new Strategy(opt, (jwt_payload, done) => {
    if (!jwt_payload) {
        done(true);
    } else {
        done(null, jwt_payload);
    }
});

passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/auth", AuthentificationRouter)
app.use("/movies", PeliculaRouter);
app.use("/characters", PersonajeRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`) 
    });
