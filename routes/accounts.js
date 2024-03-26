import { Router } from 'express';
import { AccountController } from '../controllers/accountsController.js';

export const accountsRouter = Router();

accountsRouter.route('/').get(AccountController.getAllAccounts).post(AccountController.createAccount);
accountsRouter.route('/:id').patch(AccountController.editAccount).delete(AccountController.deleteAccount);
