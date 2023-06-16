import {Router} from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import Pelicula from '../Models/pelicula.js';
import { getAll, Create, Update, deleteById, getById } from "../services/peliculaService.js";
const router = Router();

router.get('/', Authenticate, async (req,res)  =>{ //post = insert - put = update
    const todaspeliculas = await getAll(req.query.name, req.query.order);
    return res.status(200).send(todaspeliculas);
})

router.post('/',Authenticate, async (req,res) =>{
    const PeliculaN = new Pelicula();
    PeliculaN.imagen = req.body.Imagen;
    PeliculaN.titulo = req.body.Titulo;
    PeliculaN.fechaDeCreacion = req.body.FechaDeCreacion;
    PeliculaN.calificacion = req.body.Calificacion;
    const Crear = await Create(PeliculaN);
    return res.status(201).send(Crear);
})

router.put('/:id',Authenticate, async (req, res) =>{
    const IdModificado = req.params.id;
    if (IdModificado != req.body.Id) {
       return res.status(400).send();
    }
    const PeliculaN = new Pelicula();
    PeliculaN.imagen = req.body.Imagen;
    PeliculaN.titulo = req.body.Titulo;
    PeliculaN.fechaDeCreacion = req.body.FechaDeCreacion;
    PeliculaN.calificacion = req.body.Calificacion;
    
    const PeliculaModificada = await Update(IdModificado, PeliculaN);
    if (PeliculaModificada == 0) {
       return res.status(404).send();
    }
    return res.status(200).send(PeliculaModificada);
})

router.delete('/:id', Authenticate, async (req, res) =>{
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

router.get('/:id', Authenticate, async (req,res) =>{ 
    const idElegido = req.params.id;
    const peliculaElegida = await getById(idElegido);
    if (idElegido<1) { //no anda
        return res.status(400);
    }
    if (idElegido == null) {
        return res.status(404);
    }
    return res.status(200).send(peliculaElegida);
})

export default router;