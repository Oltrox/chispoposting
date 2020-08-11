import { Router } from 'express';
const router = Router();

import { createPublicacion, getPublicaciones, getPublicacion, getPublicacionesTopico, invisiblePublicacion, deletePublicacion, updatePublicacion } from '../controllers/publicacion.controller';

// /api/publicacion/...
router.post('/', createPublicacion);
router.get('/', getPublicaciones);
router.get('/:c_publicacion', getPublicacion);
router.get('/topico/:topico', getPublicacionesTopico);
router.delete('/invisible/:c_publicacion', invisiblePublicacion);
router.delete('/delete/:c_publicacion', deletePublicacion);
router.put('/:c_publicacion', updatePublicacion);


export default router;
