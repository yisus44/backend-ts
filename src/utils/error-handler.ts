// const { ResponseDTO } = require('../DTOs/ResponseDTO');
// const { BaseError, GeneralError } = require('../errors');

import { ResponseDTO } from '../DTOs/generic-response';
import { BaseError, GeneralError } from '../errors';

function errorHandler(error: Error): ResponseDTO<null> {
  let response;

  if (error instanceof BaseError) {
    response = new ResponseDTO<null>(
      null,
      false,
      error.statusCode,
      error.serializeErrors()
    );
  } else {
    const generalError = new GeneralError(error.message);

    response = new ResponseDTO<null>(
      null,
      false,
      generalError.statusCode,
      generalError.serializeErrors()
    );
  }
  //console.log(response);
  return response;
}

export { errorHandler };
