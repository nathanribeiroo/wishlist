import { Request, Response, NextFunction } from 'express';

/**
 * Middleware for routes not founds
 * 
 */
export default (request: Request, response: Response) => {
    return response.status(404).json({
        message: `url not found.`
    });
}