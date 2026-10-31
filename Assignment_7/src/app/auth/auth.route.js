import * as authController from './auth.controller.js';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signup', authController.createUser);
authRouter.post('/login',authController.loginUser)
export default authRouter;