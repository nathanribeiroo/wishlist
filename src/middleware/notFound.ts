import { Request, Response, NextFunction } from 'express';

export default (request: Request, response: Response) => {
    return response.status(404).json({
        message: `address not found.`
    });
}