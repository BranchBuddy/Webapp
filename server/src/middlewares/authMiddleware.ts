import jwt, { type JwtPayload } from 'jsonwebtoken';
import { type Request, type Response, type NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import userModel, { type User } from '../models/User';
import { AppError } from '../utils/errorHandler';
import environment from '../utils/environment';
import logger from '../utils/logger';

export interface AuthenticatedRequest extends Request {
    user?: User | null; // Replace 'any' with the appropriate type for the user object
}

/**
 * Middleware to protect routes by checking if the user has a valid JWT in the request cookie.
 */
export const authenticate = (protectEndpoint: boolean = true) => {
    return asyncHandler(
        async (
            req: AuthenticatedRequest,
            res: Response,
            next: NextFunction,
        ) => {
            let jwtToken;

            if (req.cookies?.jwtToken) {
                jwtToken = req.cookies.jwtToken;
            }

            // Make sure token exists
            if (!jwtToken && protectEndpoint) {
                throw new AppError(
                    'Not authorized to access this route',
                    'Not authorized to access this route',
                    401,
                );
            }
            if (jwtToken) {
                try {
                    // Verify token
                    const decoded: JwtPayload = jwt.verify(
                        jwtToken,
                        environment.JWT_SECRET,
                    ) as JwtPayload;

                    req.user = await userModel.findById(decoded.id);
                    next();
                } catch (err) {
                    if (protectEndpoint) {
                        throw new AppError(
                            'Not authorized to access this route',
                            'Not authorized to access this route',
                            401,
                        );
                    } else {
                        logger.info(
                            'No token found, but endpoint is not protected',
                        );
                        next();
                    }
                }
            }
        },
    );
};
