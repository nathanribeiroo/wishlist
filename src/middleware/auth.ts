import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default async (request: Request, response: Response, next: NextFunction) => {
    const authorization = request.headers.authorization;

    if (!authorization) {
        return response.status(401).json({ error: { message: 'token is required!' } });
    }

    try {

        const [, token] = authorization.split(' ');
        await jwt.verify(token, process.env.APP_SECRET);

        return next();

    } catch (error) {
        return response.status(401).json({ error: { message: 'token invalid!' } });
    }

}