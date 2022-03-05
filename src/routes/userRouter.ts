import { Router } from 'express';

import {
  createUser,
  deleteUser,
  updateUser,
  findByIdUser,
} from '../controllers/userController';

import { authenticateUser } from '../middlewares/authenticate';

import { validateId } from '../validators/general';

import { createUserValidator } from '../validators/users/user-router-validations';

const userRouter = Router();

//sign up
userRouter.post('/users', createUserValidator(), createUser);
//delete user
userRouter.delete('/users/:id', authenticateUser, validateId(), deleteUser);

userRouter.put('/users/:id', authenticateUser, validateId(), updateUser);

userRouter.get('/users/:id', validateId(), findByIdUser);

export { userRouter };
