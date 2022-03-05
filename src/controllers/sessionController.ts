import { User } from '../entities/User';
import { validationResult } from 'express-validator';
import { ResponseDTO } from '../DTOs/generic-response';
import { httpStatusCode } from '../config/enums';
import {
  BadRequestError,
  NotFoundError,
  RequestValidationError,
} from '../errors';
import { RequestBody } from '../types/RequestBody';
import { Response } from 'express';
import { errorHandler, compareHash, generateJWT } from '../utils';
import { signUpBody } from '../interfaces';
import { getConnection } from 'typeorm';
async function signUp(req: RequestBody<signUpBody>, res: Response) {
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;
    const repository = getConnection().getRepository(User);

    const userFound = await repository.findOne({ email });

    if (!userFound) {
      throw new NotFoundError();
    }

    const match = await compareHash(password, userFound.password);

    if (!match) {
      throw new BadRequestError();
    }

    const token = generateJWT(userFound.id);
    const response = new ResponseDTO(
      { userFound, token },
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

export { signUp };
