import { Router } from 'express';
const router = Router();

import { createUsuario } from '../controllers/usuario.controller';

// /api/usuario/...
router.post('/create_user', createUsuario);

export default router;