import { param, ValidationChain } from 'express-validator';
function validateId(): ValidationChain[] {
  return [param('id').not().isEmpty().withMessage('id must not be empty')];
}
export { validateId };
