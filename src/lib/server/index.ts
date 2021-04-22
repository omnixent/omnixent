import express from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import responseTime from 'response-time';
import * as dotenv from 'dotenv';
import apiV1PublicRoutes from './routes/v1/public';
import apiV1PrivateRoutes from './routes/v1/private';
import apiV1AvailabilityRoutes from './routes/v1/availability';

dotenv.config();

export default function init() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors());
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization',
    );
    next();
  });
  app.use(compression());
  app.use(responseTime());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/v1', apiV1PublicRoutes);
  app.use('/v1', apiV1PrivateRoutes);
  app.use('/v1', apiV1AvailabilityRoutes);
  app.use('/', (_, res) => res.json({ success: true }));

  if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
      console.log(`Omnixent is running at http://localhost:${port}`);
    });
  }

  return app;
}
