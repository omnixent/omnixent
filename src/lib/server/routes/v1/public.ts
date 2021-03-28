import express, { Router } from 'express';
import publicController from '../../controller/v1/public';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = express.Router();

if (process.env.ENABLE_PUBLIC_API) {
  router.get('/public', publicController);
}

export default router;
