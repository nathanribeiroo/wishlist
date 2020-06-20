import express from 'express';

import customers from './controllers/customersController';
import bookmarkProducts from './controllers/bookmarkProductsController';

const routes = express.Router();

// [CRUD] - routes for customers
routes.get('/customers/', customers.index);
routes.get('/customers/:id', customers.indexById);
routes.post('/customers', customers.create);
routes.put('/customers/:id', customers.update);
routes.delete('/customers/:id', customers.delete);

// [CRUD] routes for bookmark-products
routes.get('/customers/:id/bookmark-products', bookmarkProducts.index)
routes.get('/customers/:id/bookmark-products/:idProduct', bookmarkProducts.indexById)
routes.post('/customers/:id/bookmark-products', bookmarkProducts.create)
routes.put('/customers/:id/bookmark-products', bookmarkProducts.update)
routes.delete('/customers/:id/bookmark-products', bookmarkProducts.delete)

export default routes;
