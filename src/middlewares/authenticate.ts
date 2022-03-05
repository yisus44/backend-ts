import { BadRequestError, AuthError } from '../errors';
import { NextFunction } from 'express';
import { validateJWT, errorHandler } from '../utils';
function authenticateUser(req: any, res: any, next: NextFunction) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) throw new BadRequestError();

    const isValid = validateJWT(token);

    if (!isValid) throw new AuthError();
    next();
  } catch (error) {
    const response = errorHandler(error);
    res.status(response.statusCode).send(response);
  }
}

export { authenticateUser };
// const { AuthError, BadRequestError } = require('../errors');
// const { validateJWT, errorHandler } = require('../utils');

// function authenticateUser(req, res, next) {
//
// }

// module.exports = { authenticateUser };
