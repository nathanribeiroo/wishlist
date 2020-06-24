import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Middleware for Authenticate
 * 
 */
export default async (request: Request, response: Response, next: NextFunction) => {
    const authorization = request.headers.authorization; // get variable authorization

    if (!authorization) { // check exists
        return response.status(401).json({ error: { message: 'token is required!' } }); 
    }

    try {

        const [, token] = authorization.split(' '); // get the token sent
        await jwt.verify(token, process.env.APP_SECRET); // check is valid

        return next(); // token valid

    } catch (error) { // token invalid
        return response.status(401).json({ error: { message: 'token invalid!' } });
    }

}