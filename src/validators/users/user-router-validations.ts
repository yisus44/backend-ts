import { body, ValidationChain } from 'express-validator';
function createUserValidator(): ValidationChain[] {
  return [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password must be 8 characters long'),
    body('firstName')
      .not()
      .isEmpty()
      .withMessage('firstname must not be empty'),
    body('lastName').not().isEmpty().withMessage('lastname must not be empty'),
    body('birthDate')
      .not()
      .isEmpty()
      .withMessage('birthDate must not be empty'),
  ];
}
export { createUserValidator };
