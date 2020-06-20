import express from 'express';

import customer from './controllers/customerController';

const routes = express.Router();

routes.get('/customers/', customer.index);
routes.get('/customers/:id', customer.indexById);
routes.post('/customers', customer.create);
routes.put('/customers/:id', customer.update);
routes.delete('/customers/:id', customer.delete);

export default routes;
