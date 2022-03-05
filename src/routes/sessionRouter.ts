import { Router } from 'express';
import { signUpValidations } from '../validators/sessions/sesion-router-validations';
import { signUp } from '../controllers/sessionController';

const sessionRouter = Router();
//sign in
sessionRouter.post('/session', signUpValidations(), signUp);

export { sessionRouter };
