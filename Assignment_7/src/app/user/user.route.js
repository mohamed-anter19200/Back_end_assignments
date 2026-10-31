import { Router } from 'express';
import * as userController from './user.controller.js';

const userRouter = Router();

userRouter.patch('/:id', userController.updateUser);
userRouter.delete('/', userController.deleteUser);
userRouter.get('/', userController.getUserById);
export default userRouter;