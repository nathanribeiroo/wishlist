import { Request, Response } from 'express';
import check from './validator';

import Customer from '../models/Customer';

export default {

	async index(request: Request, response: Response) {
		try {
			const { id } = request.params;

			check.isUuid('id customer', id);

			const customers = new Customer();

			if (typeof id === 'undefined') {
				const result = await customers.findAll();
				return response.json(result);
			}

			const result: any = await customers.findById(id);

			if (result.length === 0) {
				return response.status(404).json({ error: { message: 'customer not found.' } });
			}

			return response.json(result[0]);
		} catch (error) {
			return response.status(error.status || 500).json({ error });
		}
	},

	async create(request: Request, response: Response) {
		try {
			const { name, email } = request.body;

			check.isEmpty(name);
			check.isEmail(email);

			const customers = new Customer();
			const result: any = await customers.create({ name, email });

			return response.json(result);
		} catch (error) {
			return response.status(error.status || 500).json({ error });
		}
	},

	async update(request: Request, response: Response) {
		try {
			const { id } = request.params;
			const { name, email } = request.body;

			const update: { name?: string, email?: string } = {};

			check.isUuid('id customer', id);

			if (typeof name !== 'undefined') {
				check.isEmpty(name);
				update.name = name;
			}

			if (typeof email !== 'undefined') {
				check.isEmail(email);
				update.email = email;
			}

			const customers = new Customer();
			const result: any = await customers.update(id, update);

			if (result.length === 0) {
				return response.status(404).json({ error: { message: 'customer not found.' } });
			}

			return response.json(result[0]);
		} catch (error) {
			return response.status(error.status || 500).json({ error });
		}
	},

	async delete(request: Request, response: Response) {
		try {
			const { id } = request.params;

			check.isUuid('id customer', id);

			const customers = new Customer();

			const result: any = await customers.delete(id);

			if (result.affectedRows > 0) {
				return response.status(204).send();
			}

			return response.status(404).json({ error: { message: 'customer not found.' } });
		} catch (error) {
			return response.status(error.status || 500).json({ error });
		}
	},

};
