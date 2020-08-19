import { Router } from 'express';
const router = Router();

import { createSeguir, getSeguirSeguidores, getSeguirSeguidos, getSeguirSeguido, deleteSeguir } from '../controllers/seguir.controller';

// /api/seguir/...
router.post('/', createSeguir);
router.post('/seguido/', getSeguirSeguido);
router.get('/seguidores/:id', getSeguirSeguidores);
router.get('/seguidos/:id', getSeguirSeguidos);
router.delete('/:id_1/:id_2', deleteSeguir);

export default router;