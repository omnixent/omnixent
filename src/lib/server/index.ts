import express from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import apiV1Routes from './routes/v1/public';

dotenv.config();

export default function init() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/v1', apiV1Routes);

  app.listen(port, () => {
    console.log(`Omnixent is running at http://localhost:${port}`);
  });
}
