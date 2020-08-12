import { Router } from 'express';
const router = Router();

import { createUsuario, getUsuarios, getUsuario, deleteUsuario, updateUsuario, testlogin } from '../controllers/usuario.controller';

// /api/usuario/...
router.post('/', createUsuario);
router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.delete('/:c_usuario', deleteUsuario);
router.put('/:id_usuario', updateUsuario);

router.post('/login/', testlogin);

export default router;