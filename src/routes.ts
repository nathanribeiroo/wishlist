import express, { Request, Response, NextFunction } from 'express';

import customers from './controllers/customersController';
import products from './controllers/productsController';
import users from './controllers/usersController';

import auth from './middleware/auth';
import notFound from './middleware/notFound';

const routes = express.Router();

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
