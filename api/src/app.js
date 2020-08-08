import express, { json } from 'express';
import morgan from 'morgan';

// importing routes
import sampleRoutes from './routes/sample';


// initialization
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(json());

// routes
app.use('/api/sample', sampleRoutes);

export default app;