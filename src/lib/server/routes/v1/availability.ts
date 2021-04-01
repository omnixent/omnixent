import express, { Router } from 'express';
import availabilityController from '../../controller/v1/availability';

const router: Router = express.Router();

router.get('/availability', availabilityController);

export default router;
