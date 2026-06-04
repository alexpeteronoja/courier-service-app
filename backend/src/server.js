import 'dotenv/config';
import mongoose from 'mongoose';
import { app } from './app.js';

mongoose
  .connect(process.env.MONGO_URL_PROD)

  .then(() => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.log('Error Connecting DB', err);
  });

app.listen(process.env.NODE || 3000, () => {
  console.log('Server Started at port 3000');
});
