import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';

// importing routes
import topicoRoutes from './routes/topico'
import usuarioRoutes from './routes/usuario';
import publicacionRoutes from './routes/publicacion';
import comentarioRoutes from './routes/comentario';
import evaluacionRoutes from './routes/evaluacion';
import seguirRoutes from './routes/seguir';

// initialization
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(json());
app.use(cors());

// routes
app.use('/api/topico', topicoRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/publicacion', publicacionRoutes);
app.use('/api/comentario', comentarioRoutes);
app.use('/api/evaluacion', evaluacionRoutes);
app.use('/api/seguir', seguirRoutes);

export default app;