import express from "express";
import PersonajeRouter from "./Controller/personajeController.js";
import PeliculaRouter from "./Controller/peliculaController.js";
import AuthentificationRouter from "./Controller/authentificationController.js";
import "dotenv/config";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TP3 DAI",
      version: "1.0.0",
      description: "Trabajo numero tres de DAI"
    },
    
    servers: [
      {
        url: "http://localhost:3000" // Update the URL to match your server configuration
      }
    ],
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    }
  },
  security: [{
    bearerAuth: []
  }],
  apis: ['./src/Controller/*.js']
};

const specs = swaggerJSDoc(options);

const app = express();
const port = 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
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

app.use("/auth", AuthentificationRouter);
app.use("/movies", PeliculaRouter);
app.use("/characters", PersonajeRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
