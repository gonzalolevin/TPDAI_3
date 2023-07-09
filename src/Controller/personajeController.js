import {Router} from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import Personaje from '../Models/personaje.js';
import { getAll, Create, Update, deleteById, getById } from "../services/personajeService.js";
const router = Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Personaje:
 *       type: object
 *       required:
 *         - imagen
 *         - nombre
 *         - edad
 *         - peso
 *         - historia
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID del personaje.
 *         imagen:
 *           type: string
 *           description: La imagen del personaje.
 *         nombre:
 *           type: string
 *           description: El nombre del personaje.
 *         edad:
 *           type: integer
 *           description: La edad del personaje.
 *         peso:
 *           type: integer
 *           description: El peso del personaje.
 *         historia:
 *           type: string
 *           description: La historia del personaje.
 *       example:
 *         id: 1
 *         imagen: https://example.com/image.jpg
 *         nombre: Petter Griffin
 *         edad: 30
 *         peso: 70
 *         historia: Muy loco.
 */

/**
 * @swagger
 * tags:
 *  name: Personajes
 *  description: La API de manejo de Personajes
 */

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Devuelve una lista de todos los personajes.
 *     tags: [Personajes]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre del personaje (opcional)
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *         description: Edad del personaje (opcional)
 *       - in: query
 *         name: weight
 *         schema:
 *           type: integer
 *         description: Peso del personaje (opcional)
 *       - in: query
 *         name: movies
 *         schema:
 *           type: integer
 *         description: Película relacionada (opcional)
 *     responses:
 *       '200':
 *         description: La lista de personajes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Personaje'
 */



router.get('/', Authenticate, async (req,res)  =>{ 
    const todospersonajes = await getAll(req.query.name, req.query.age, req.query.weight, req.query.movies);
    return res.status(200).send(todospersonajes);
})

/**
 * @swagger
 * /characters:
 *   post:
 *     summary: Crear un personaje nuevo.
 *     tags: [Personajes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Personaje'
 *     responses:
 *       '201':
 *         description: El personaje se creo de manera correcta.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personaje'
 */

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

/**
 * @swagger
 * /characters/{id}:
 *   put:
 *     summary: Actualizar un personaje existente.
 *     tags: [Personajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del personaje.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Personaje'
 *     responses:
 *       '200':
 *         description: El personaje fue actualizado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personaje'
 *       '400':
 *         description: Los ID no coinciden.
 *       '404':
 *         description: No se encontro el personaje solicitado.
 */

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

/**
 * @swagger
 * /characters/{id}:
 *   delete:
 *     summary: Eliminar un personaje segun su ID.
 *     tags: [Personajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del personaje.
 *     responses:
 *       '200':
 *         description: El personaje fue eliminado.
 *       '400':
 *         description: El ID es incorrecto.
 *       '404':
 *         description: El ID no fue encontrado.
 */

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

/**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Traer el personaje por ID
 *     tags: [Personajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer 
 *         required: true
 *         description: El ID del personaje
 *     responses:
 *       200:
 *         description: La informacion del personaje por ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personaje'
 *       404:
 *         description: El personaje no se encontro
 */

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
/*
router.get('/:id', Authenticate, async (req,res) =>{ 
    const personajes = await searchByName();
    res.send('name' + req.query.name)
    res.send('age' + req.query.age)
    res.send('peso' + req.query.weight)
    res.send('movies' + req.query.movies)

})
*/


export default router;

