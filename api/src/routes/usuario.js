import { Router } from 'express';
const router = Router();

import { createUsuario, getUsuarios, getUsuario, deleteUsuario, updateUsuario, login, checkToken, logout, getUsuarioId } from '../controllers/usuario.controller';

//router.use( checkToken );

// /api/usuario/...
router.post('/', createUsuario);
router.get('/', getUsuarios); // checkToken
router.get('/id/', getUsuarioId); 
router.get('/:id', getUsuario); // checkToken

router.delete('/:c_usuario', deleteUsuario); // checkToken
router.put('/:id_usuario', updateUsuario); // checkToken
router.post('/login/', login);
router.post('/logout/', checkToken , logout);

export default router;