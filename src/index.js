import express from "express";
import PersonajeRouter from "./Controller/personajeController.js";
import PeliculaRouter from "./Controller/peliculaController.js";


const app = express();
const port = 3000;


app.use(express.json());


app.use("/movies", PeliculaRouter);
app.use("/characters", PersonajeRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`) 
    });