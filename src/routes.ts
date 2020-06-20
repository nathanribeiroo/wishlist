import express from 'express';

import customers from './controllers/customersController';
import products from './controllers/productsController';

const routes = express.Router();

// [CRUD] - routes for customers
routes.get('/customers/', customers.index);
routes.get('/customers/:id', customers.indexById);
routes.post('/customers', customers.create);
routes.put('/customers/:id', customers.update);
routes.delete('/customers/:id', customers.delete);

// [CRUD] routes for products
routes.get('/customers/:id/products', products.index)
routes.get('/customers/:id/products/:idProduct', products.indexById)
routes.post('/customers/:id/products', products.create)
routes.put('/customers/:id/products', products.update)
routes.delete('/customers/:id/products', products.delete)

export default routes;
