import {Router} from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import { getSignedToken } from "../services/authentification.js";
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Autentificacion:
 *       type: object
 */


/**
 * @swagger
 * tags:
 *  name: Autentificacion
 *  description: El token de autenticación.
 */

/**
 * @swagger
 * /authentification:
 *   get:
 *     summary: Devuelve un bearer token para la autentificacion.
 *     tags: [Autentificacion]
 *     responses:
 *       '200':
 *         description: El token de autenticación.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pelicula'
 */


router.get('/login', async (req,res)  =>{ 
    const token = await getSignedToken();
    return res.status(200).send(token);
})

export default router;