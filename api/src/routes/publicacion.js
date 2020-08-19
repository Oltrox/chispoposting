import { Router } from 'express';
const router = Router();

import { createPublicacion, getPublicaciones, getPublicacion, getPublicacionesTopico, invisiblePublicacion, deletePublicacion, updatePublicacion, getPublicacionesPropias, getPublicacionesUsuario, getPublicacionesUsuarios, getUsuariosTopico, getPublicacionesRiesgosas } from '../controllers/publicacion.controller';

// /api/publicacion/...
router.post('/', createPublicacion);

router.get('/', getPublicaciones); // Enviar con usuarios

router.get('/usuario/', getPublicacionesUsuarios);
router.get('/usuario/:id', getPublicacionesUsuario); // Enviar con usuario

router.get('/riesgosas/', getPublicacionesRiesgosas);

router.get('/topico/:topico', getPublicacionesTopico);

router.get('/topico/usuario/:topico', getUsuariosTopico);
router.get('/propias/:id', getPublicacionesPropias);

router.get('/:c_publicacion', getPublicacion); // Enviar con usuario (2 objetos)


router.delete('/invisible/:c_publicacion', invisiblePublicacion);
router.delete('/delete/:c_publicacion', deletePublicacion);

router.put('/:c_publicacion', updatePublicacion);

export default router;