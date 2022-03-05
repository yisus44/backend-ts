import { body, ValidationChain } from 'express-validator';
function signUpValidations(): ValidationChain[] {
  return [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Password must be 8 characters long'),
  ];
}
export { signUpValidations };
