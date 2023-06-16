import {Router} from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import Personaje from '../Models/personaje.js';
import { getAll, Create, Update, deleteById, getById } from "../services/personajeService.js";
const router = Router();


router.get('/', Authenticate, async (req,res)  =>{ 
    const todospersonajes = await getAll(req.query.name, req.query.age, req.query.weight, req.query.movies);
    return res.status(200).send(todospersonajes);
})

router.post('/', Authenticate, async (req,res) =>{
    const PersonajeN = new Personaje();
    PersonajeN.nombre = req.body.Nombre;
    PersonajeN.imagen = req.body.Imagen;
    PersonajeN.edad = req.body.Edad;
    PersonajeN.peso = req.body.Peso;
    PersonajeN.historia = req.body.Historia;
    const Crear = await Create(PersonajeN);
    return res.status(201).send(Crear);
})

router.put('/:id', Authenticate, async (req, res) =>{
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

router.delete('/:id', Authenticate, async (req, res) =>{
    const idElegido = req.params.id;
    const rowsAffected = await deleteById(idElegido);
    
    if (idElegido<1) {
        return res.status(400).send();
    }
    if (rowsAffected == 0) {
        return res.status(404).send();
    }

    return res.status(200).send();
})

router.get('/:id', Authenticate, async (req,res) =>{ 
    const idElegido = req.params.id;
    const personajeElegido = await getById(idElegido);
    if (idElegido<1) { 
        return res.status(400);
    }
    if (idElegido == null) {
        return res.status(404);
    }
    return res.status(200).send(personajeElegido);
})

//HAY QUE INCLUIR ESTO DENTRO DEL getAll
// 
router.get('/:id', Authenticate, async (req,res) =>{ 
    const personajes = await searchByName();
    res.send('name' + req.query.name)
    res.send('age' + req.query.age)
    res.send('peso' + req.query.weight)
    res.send('movies' + req.query.movies)

})


export default router;

