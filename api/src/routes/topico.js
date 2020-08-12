import { Router } from 'express';
const router = Router();

import { getTopicos, createTopico } from '../controllers/topico.controller';

// /api/topico/...
router.post('/', createTopico);
router.get('/', getTopicos);

export default router;