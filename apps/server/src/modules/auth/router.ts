import { Router } from 'express';
import { refreshUserHandler, signInHandler, signOutHandler } from './handler';

const authRouter: Router = Router();

authRouter.post('/sign-in', signInHandler);
authRouter.post('/sign-out', signOutHandler);
authRouter.post('/refresh-user', refreshUserHandler);

export default authRouter;
