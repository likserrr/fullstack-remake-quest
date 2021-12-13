// Нужно решить проблемы при создании Active.
// Методом подбора можно присвоить любому юзеру любой коммент

import express from 'express';
import mongoose from 'mongoose';
import router from './router.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const PORT = 5000;
const DB_URL = `UrlMongoHere`;

const app = express();

app.use(express.json());
app.use('/img', express.static('static'));
app.use(fileUpload({}));
app.use(cors());
app.use('/api', router);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
