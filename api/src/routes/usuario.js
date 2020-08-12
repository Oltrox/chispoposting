import { Router } from 'express';
const router = Router();

import { createUsuario, getUsuarios, getUsuario, deleteUsuario, updateUsuario, login, checkToken } from '../controllers/usuario.controller';

//router.use( checkToken );

// /api/usuario/...
router.post('/', createUsuario);
router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.delete('/:c_usuario', deleteUsuario);
router.put('/:id_usuario', updateUsuario);
router.post('/login/', login);
//router.post('/logout/', logout);

export default router;