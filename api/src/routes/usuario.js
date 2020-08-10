import { Router } from 'express';
const router = Router();

import { createUsuario, getUsuarios, getUsuario, deleteUsuario, updateUsuario } from '../controllers/usuario.controller';

// /api/usuario/...
router.post('/', createUsuario);
router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.delete('/:id', deleteUsuario);
router.put('/:c_usuario', updateUsuario);

export default router;