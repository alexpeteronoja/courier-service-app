import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRoutes.js';
import { errorController } from './controllers/errorController.js';
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line node/no-unpublished-import
import morgan from 'morgan';
import { shipmentRouter } from './routes/shipmentRoutes.js';
import { authRouter } from './routes/authRoutes.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/shipment', shipmentRouter);

app.use(errorController);

export { app };
