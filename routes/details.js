import { Router } from 'express';
import { DetailController } from '../controllers/detailsController.js';

export const detailsRouter = Router();

detailsRouter.post('/:id', DetailController.createDetail);
