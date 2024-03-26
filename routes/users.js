import { Router } from 'express';
import { UserController } from '../controllers/usersController.js';

export const usersRouter = Router();

usersRouter.post('/register', UserController.register);
usersRouter.post('/login', UserController.auth);
usersRouter.get('/confirm/:token', UserController.confirm);
usersRouter.post('/forget-password', UserController.forgetPassword);
usersRouter.route('/forget-password/:token').get(UserController.checkToken).post(UserController.newPassword);
