import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import customers from './controllers/customersController';
import products from './controllers/productsController';
import users from './controllers/usersController';

const routes = express.Router();

const notFound = (request: Request, response: Response) => {
    return response.status(404).json({
        message: `address not found.`
    });
}

const auth = async (request: Request, response: Response, next: NextFunction) => {
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

// route for authenticate
routes.post('/login', users.login);

routes.use('/customers', auth);

// [CRUD] - routes for customers
routes.get('/customers', customers.index);
routes.get('/customers/:id', customers.index);
routes.post('/customers', customers.create);
routes.put('/customers/:id', customers.update);
routes.delete('/customers/:id', customers.delete);

// [CRUD] routes for products
routes.get('/customers/:id/products', products.index)
routes.get('/customers/:id/products/:productId', products.index)
routes.post('/customers/:id/products', products.create)
routes.delete('/customers/:id/products/:productId', products.delete)


// URL not found
routes.use(notFound);

export default routes;
