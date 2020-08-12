import { Router } from 'express';
const router = Router();

import { createPublicacion, getPublicaciones, getPublicacion, getPublicacionesTopico, invisiblePublicacion, deletePublicacion, updatePublicacion, getPublicacionesPropias, getPublicacionesUsuario } from '../controllers/publicacion.controller';

// /api/publicacion/...
router.post('/', createPublicacion);
router.get('/', getPublicaciones); // Enviar con usuarios
router.get('/:c_publicacion', getPublicacion);
router.get('/topico/:topico', getPublicacionesTopico);
router.get('/propias/:id', getPublicacionesPropias);
router.get('/usuario/:id', getPublicacionesUsuario); // Enviar con usuario
router.delete('/invisible/:c_publicacion', invisiblePublicacion);
router.delete('/delete/:c_publicacion', deletePublicacion);
router.put('/:c_publicacion', updatePublicacion);

export default router;
