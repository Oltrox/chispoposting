import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';

// importing routes
import usuarioRoutes from './routes/usuario';
import publicacionRoutes from './routes/publicacion';
import comentarioRoutes from './routes/comentario';

// initialization
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(json());
app.use(cors());

// routes
app.use('/api/usuario', usuarioRoutes);
app.use('/api/publicacion', publicacionRoutes);
app.use('/api/comentario', comentarioRoutes);

export default app;