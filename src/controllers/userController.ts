import { validationResult } from 'express-validator';
import { Response, Request } from 'express';

import { ResponseDTO } from '../DTOs';
import { httpStatusCode } from '../config/enums';
import {
  BadRequestError,
  NotFoundError,
  RequestValidationError,
} from '../errors';
import { User } from '../entities';
import { errorHandler, generateHash, generateJWT } from '../utils';
import { RequestBody } from '../types';
import { createUserBody, updateUserBody } from '../interfaces';
import { getConnection } from 'typeorm';

async function createUser(req: RequestBody<createUserBody>, res: Response) {
  const errors = validationResult(req);
  console.log(req.body);
  try {
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const hashedPassword = await generateHash(req.body.password);
    req.body.password = hashedPassword;

    const repository = getConnection().getRepository(User);

    const user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    if (req.body.secondLastName) user.secondLastName = req.body.lastName;
    user.birthDate = req.body.birthDate;
    user.password = req.body.password;
    user.birthDate = req.body.birthDate;
    user.email = req.body.email;
    const newUser = await repository.save(user);

    // const userDTO = new UserDTO(newUser);
    // await setRole(newUser._id);
    const token = generateJWT(newUser.id);

    const response = new ResponseDTO(
      { newUser, token },
      true,
      httpStatusCode.OK,
      null
    );
    res.status(response.statusCode).send(response);
  } catch (error) {
    const response = errorHandler(error);
    res.status(response.statusCode).send(response);
  }
}

async function updateUser(req: RequestBody<updateUserBody>, res: Response) {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { id } = req.params;
    const repository = getConnection().getRepository(User);
    //returns user before update
    const userToUpdate = await repository.findOne(id);

    if (!userToUpdate) {
      throw new NotFoundError();
    }

    if (req.body.password) {
      const hashedPassword = await generateHash(req.body.password);
      req.body.password = hashedPassword;
    }

    await repository.update(id, req.body);
    const updatedUser = await repository.findOne(id);

    const response = new ResponseDTO(
      { updatedUser },
      true,
      httpStatusCode.OK,
      null
    );
    res.status(response.statusCode).send(response);
  } catch (error) {
    const response = errorHandler(error);
    res.status(response.statusCode).send(response);
  }
}

async function deleteUser(req: Request, res: Response) {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { id } = req.params;
    const repository = getConnection().getRepository(User);

    const userToDelete = await repository.findOne(id);
    if (!userToDelete) {
      throw new NotFoundError();
    }
    await repository.delete(id);

    const response = new ResponseDTO(
      { userToDelete },
      true,
      httpStatusCode.OK,
      null
    );
    res.status(response.statusCode).send(response);
  } catch (error) {
    const response = errorHandler(error);
    res.status(response.statusCode).send(response);
  }
}

async function findByIdUser(req: Request, res: Response) {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { id } = req.params;
    const repository = getConnection().getRepository(User);
    const userFound = await repository.findOne(id);
    if (!userFound) {
      throw new NotFoundError();
    }
    const response = new ResponseDTO(
      { userFound },
      true,
      httpStatusCode.OK,
      null
    );
    res.status(response.statusCode).send(response);
  } catch (error) {
    const response = errorHandler(error);
    res.status(response.statusCode).send(response);
  }
}

export { createUser, deleteUser, updateUser, findByIdUser };
