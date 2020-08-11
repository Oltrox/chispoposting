import { Router } from 'express';
const router = Router();

import { createComentario, getComentario, getComentariosPublicacion, getComentariosUsuario, getComentarios, deleteComentario, updateComentario } from '../controllers/comentario.controller';

// /api/comentario/...
router.post('/', createComentario);
router.get('/:c_comentario', getComentario);
router.get('/publicacion/:c_publicacion', getComentariosPublicacion);
router.get('/usuario/:c_usuario', getComentariosUsuario);
router.get('/', getComentarios);
router.delete('/:c_comentario', deleteComentario);
router.put('/:c_comentario', updateComentario);



export default router;