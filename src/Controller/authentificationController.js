import {Router} from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import { getSignedToken } from "../services/authentification.js";
const router = Router();

/**
 * @swagger
 * /auth/login:
 *   get:
 *     tags:
 *       - Autentificacion
 *     summary: Devuelve un bearer token para la autenticacion.
 *     description: El token de autenticación.
 *     operationId: getAuthentification
 *     responses:
 *       '200':
 *         description: El token de autenticación.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DataType'
 */


router.get('/login', async (req,res)  =>{ 
    const token = await getSignedToken();
    return res.status(200).send(token);
})

export default router;