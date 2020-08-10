import express, { json } from 'express';
import morgan from 'morgan';

// importing routes
import usuarioRoutes from './routes/usuario';


// initialization
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(json());

// routes
app.use('/api/usuario', usuarioRoutes);

export default app;