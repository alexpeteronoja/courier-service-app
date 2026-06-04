import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import { app } from './app.js';

app.use(cors({ origin: 'http://localhost:5173' }));

mongoose
  .connect(process.env.MONGO_URL_PROD)

  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.log('Error Connecting DB', err);
  });

app.listen(process.env.PORT || 3000, () => {
  console.log('Server Started at port 3000');
});
