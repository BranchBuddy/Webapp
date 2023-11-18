import { Router } from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    verifyUser,
} from '../controllers/authController';
import { authenticate } from '../middlewares/authMiddleware';

export const authRouter = Router();

authRouter.route('/verify').get(authenticate(true), verifyUser);

authRouter.route('/register').post(registerUser);

authRouter.route('/login').post(loginUser);

authRouter.route('/logout').post(logoutUser);

export default authRouter;
