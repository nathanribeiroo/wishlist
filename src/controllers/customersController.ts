import { Request, Response } from 'express';
import check from './validator';

import Customer from '../models/Customer';

/**
 * customersController
 * 
 * CRUD customers
 * 
 */
export default {

	/**
	 * Function for list all customers or detail customer.
	 * 
	 * @param request Request
	 * @param response Response
	 */
	async index(request: Request, response: Response) {
		try {
			const { id } = request.params;

			check.isUuid('id customer', id); // validate id

			const customers = new Customer(); // creates an instance model

			if (typeof id === 'undefined') { // checks if the search is for all customers
				const result = await customers.findAll();
				return response.json(result);  // return all customers
			}

			const result: any = await customers.findById(id); // search details customer with id

			if (result.length === 0) { // check if exists
				return response.status(404).json({ error: { message: 'customer not found.' } });
			}

			return response.json(result[0]); // return details customer
		} catch (error) {
			return response.status(error.status || 500).json({ error }); // error | check | customer 
		}
	},

	/**
	 * Creates new customer with email and name.
	 * 
	 * @param request Request
	 * @param response Response
	 */
	async create(request: Request, response: Response) {
		try {
			const { name, email } = request.body;

			check.isEmpty(name); // validate name
			check.isEmail(email); // validate email

			const customers = new Customer(); // creates an instance model
			const result: any = await customers.create({ name, email }); // creates new customer

			return response.json(result); // show new customer
		} catch (error) {
			return response.status(error.status || 500).json({ error }); // error | check | customer 
		}
	},

	/**
	 * Updates customer with name or email.
	 * 
	 * @param request Request
	 * @param response Response
	 */
	async update(request: Request, response: Response) {
		try {
			const { id } = request.params; // id customer
			const { name, email } = request.body;

			const update: { name?: string, email?: string } = {}; 

			check.isUuid('id customer', id);  // validate id

			if (typeof name !== 'undefined') { // check sure you received the name
				check.isEmpty(name); 
				update.name = name;
			}

			if (typeof email !== 'undefined') { // check sure you received the email
				check.isEmail(email);
				update.email = email; 
			}

			if (!name && !email) { // check if you received any data
				return response.status(400).json({ error: { message: 'name or email is required.' } });
			}

			const customers = new Customer(); // creates an instance model 
			const result: any = await customers.update(id, update); // update customer

			if (result.length === 0) { // check customer exists
				return response.status(404).json({ error: { message: 'customer not found.' } });
			}

			return response.json(result[0]); // show updated customers 
		} catch (error) {
			return response.status(error.status || 500).json({ error }); // error | check | customer 
		}
	},

	/**
	 * Delete customer.
	 * 
	 * @param request Request
	 * @param response Response
	 */
	async delete(request: Request, response: Response) {
		try {
			const { id } = request.params; // id customer 

			check.isUuid('id customer', id); // validate id

			const customers = new Customer(); // creates an instance model

			const result: any = await customers.delete(id); // delete Customer

			if (result.affectedRows > 0) { // deleted true
				return response.status(204).send(); // send status 404, no content
			}

			return response.status(404).json({ error: { message: 'customer not found.' } }); // error
		} catch (error) {
			return response.status(error.status || 500).json({ error }); // error | check | customer 
		}
	},

};
