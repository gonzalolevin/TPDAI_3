import { Router } from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import Pelicula from '../Models/pelicula.js';
import { getAll, Create, Update, deleteById, getById } from '../services/peliculaService.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pelicula:
 *       type: object
 *       required:
 *         - imagen
 *         - titulo
 *         - fechaDeCreacion
 *         - calificacion
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID de la pelicula.
 *         imagen:
 *           type: string
 *           description: La imagen de la pelicula.
 *         titulo:
 *           type: string
 *           description: El titulo de la pelicula.
 *         fechaDeCreacion:
 *           type: string
 *           format: date
 *           description: La fecha de creacion de la pelicula.
 *         calificacion:
 *           type: integer
 *           description: La calificacion de la pelicula.
 *       example:
 *         id: 2
 *         imagen: https/imagen.com
 *         titulo: Forrest Gump
 *         fechaDeCreacion: '2001-10-10'
 *         calificacion: 5
 */


/**
 * @swagger
 * tags:
 *  name: Peliculas
 *  description: La API de manejo de Peliculas
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Devuelve una lista de todas las peliculas.
 *     tags: [Peliculas]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre de la pelicula (opcional)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Orden de clasificación (opcional)
 *     responses:
 *       '200':
 *         description: La lista de peliculas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelicula'
 */

router.get('/', Authenticate, async (req,res)  =>{ //post = insert - put = update
    const todaspeliculas = await getAll(req.query.name, req.query.order);
    return res.status(200).send(todaspeliculas);
})

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Crear una pelicula nueva.
 *     tags: [Peliculas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pelicula'
 *     responses:
 *       '201':
 *         description: La pelicula se creo de manera correcta.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pelicula'
 */


router.post('/',Authenticate, async (req,res) =>{
    const PeliculaN = new Pelicula();
    PeliculaN.imagen = req.body.Imagen;
    PeliculaN.titulo = req.body.Titulo;
    PeliculaN.fechaDeCreacion = req.body.FechaDeCreacion;
    PeliculaN.calificacion = req.body.Calificacion;
    const Crear = await Create(PeliculaN);
    return res.status(201).send(Crear);
})

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Actualizar una pelicula existente.
 *     tags: [Peliculas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la pelicula.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pelicula'
 *     responses:
 *       '200':
 *         description: La pelicula fue actualizada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pelicula'
 *       '400':
 *         description: Los ID no coinciden.
 *       '404':
 *         description: No se encontro la pelicula solicitada.
 */


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

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Eliminar una pelicula segun su ID.
 *     tags: [Peliculas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la pelicula.
 *     responses:
 *       '200':
 *         description: La pelicula fue eliminada.
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
    if (rowsAffected[0] == 0) {
        return res.status(404).send();
    }

    return res.status(200).send();
})

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Traer la pelicula por ID
 *     tags: [Peliculas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string 
 *         required: true
 *         description: El ID de la pelicula
 *     responses:
 *       200:
 *         description: La informacion de la pelicula por ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pelicula'
 *       404:
 *         description: La pelicula no se encontro
 */


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