import {Router} from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import { getSignedToken } from "../services/authentification.js";
const router = Router();

router.get('/login', async (req,res)  =>{ 
    const token = await getSignedToken();
    return res.status(200).send(token);
})

export default router;