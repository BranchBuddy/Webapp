import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import {
    registerUser as registerUserService,
    loginUser as loginUserService,
} from '../services/authService';
import { type AuthenticatedRequest } from '../middlewares/authMiddleware';

/**
 * This method creates a new user and returns a JWT as a cookie   *
 * @param req - The request object
 * @param res - The response object
 * @returns a JWT as a cookie and the registration DTO including the user, and the token.
 */
export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { user, token, options } = await registerUserService(req.body);
        res.status(201)
            .cookie('jwtToken', token, options)
            .json({ user, token, message: 'User registered successfully' });
    },
);

/**
 * This method logs in a user and returns a JWT as a cookie   *
 * @param req - The request object
 * @param res - The response object
 * @returns a JWT as a cookie and the login DTO including the token.
 */
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { user, token, options } = await loginUserService(
        req.body.email,
        req.body.password,
    );
    res.status(200)
        .cookie('jwtToken', token, options)
        .json({ user, token, message: 'User logged in successfully' });
});

/**
 * Route POST api/auth/logout
 * Logs out a user
 * @param req - The request object
 * @param res - The response object
 * @returns a JWT as a cookie and the logout DTO including the token.
 */
export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    // res.cookie('jwtToken', '', {
    //     httpOnly: true,
    //     expires: new Date(0),
    // });
    res.status(500).json({ message: 'User logged out successfully' });
});

export const verifyUser = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
        res.status(200).json(req.user);
    },
);
