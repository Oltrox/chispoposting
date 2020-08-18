import { Router } from 'express';
const router = Router();

import { createSeguir, getSeguirSeguidores, getSeguirSeguidos, deleteSeguir } from '../controllers/seguir.controller';

// /api/seguir/...
router.post('/', createSeguir);
router.get('/seguidores/:id', getSeguirSeguidores);
router.get('/seguidos/:id', getSeguirSeguidos);
router.delete('/', deleteSeguir);

export default router;