import express, { Router } from 'express';
import privateController from '../../controller/v1/private';

const router: Router = express.Router();

router.get('/private', privateController);

export default router;
