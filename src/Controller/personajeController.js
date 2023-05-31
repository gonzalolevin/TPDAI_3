import {Router} from 'express';
import express from "express"; //RARO
import Personaje from '../Models/personaje.js';
import { getAll, Create, Update, deleteById, getById } from "../services/personajeService.js";
const router = Router();


router.get('/', async (req,res)  =>{ 
    const todospersonajes = await getAll();
    return res.status(200).send(todospersonajes);
})

router.post('/', async (req,res) =>{
    const PersonajeN = new Personaje();
    PersonajeN.nombre = req.body.Nombre;
    PersonajeN.imagen = req.body.Imagen;
    PersonajeN.edad = req.body.Edad;
    PersonajeN.peso = req.body.Peso;
    PersonajeN.historia = req.body.Historia;
    const Crear = await Create(PersonajeN);
    return res.status(201).send(Crear);
})

router.put('/:id', async (req, res) =>{
    const IdModificado = req.params.id;
    if (IdModificado != req.body.Id) {
       return res.status(400).send();
    }
    const PersonajeN = new Personaje();
    PersonajeN.nombre = req.body.Nombre;
    PersonajeN.imagen =req.body.Imagen;
    PersonajeN.edad = req.body.Edad;
    PersonajeN.peso = req.body.Peso;
    PersonajeN.historia = req.body.Historia;

    const PersonajeModificado = await Update(IdModificado, PersonajeN);
    if (PersonajeModificado == 0) {
       return res.status(404).send();
    }
    return res.status(200).send(PersonajeModificado);
})

router.delete('/:id', async (req, res) =>{
    const idElegido = req.params.id;
    const rowsAffected = await deleteById(idElegido);
    
    if (idElegido<1) {
        return res.status(400).send();
    }
    if (rowsAffected[0] == 0) {
        return res.status(404).send();
    }

    return res.status(200).send();
})

router.get('/:id', async (req,res) =>{ 
    const idElegido = req.params.id;
    const personajeElegido = await getById(idElegido);
    if (idElegido<1) { //no anda
        return res.status(400);
    }
    if (idElegido == null) {
        return res.status(404);
    }
    return res.status(200).send(personajeElegido);
})


export default router;

