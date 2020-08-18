import { Router } from 'express';
const router = Router();

import { createEvaluacion, getEvaluacionPublicacion, getEvaluacionUsuario, deleteEvaluacion, updateEvaluacion } from '../controllers/evaluacion.controller';

// /api/evaluacion/...
router.post('/', createEvaluacion);
router.get('/publicacion/:c_publicacion', getEvaluacionPublicacion);
router.get('/usuario/', getEvaluacionUsuario);
router.delete('/', deleteEvaluacion);
router.put('/',updateEvaluacion);

export default router;