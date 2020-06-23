import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import check from './validator';

import User from '../models/User';

export default {

	async login(request: Request, response: Response) {
		try {
			const { email, password } = request.body;

			check.isEmail(email);
			check.isEmpty(password, 'password');

			const user = new User();
			const result: any = await user.auth(email);

			if (result.length === 0) {
				return response.status(404).json({ error: { message: 'user not found.' } });
			}

			if (await bcrypt.compare(password, result[0].password)) {
				const token = jwt.sign({ id: result[0].id }, process.env.APP_SECRET, {
					expiresIn: parseInt(process.env.EXPIRES_IN || '1800') // expires in 30 with default
				})

				return response.json({ email, token });
			}

			return response.status(404).json({ error: { message: 'user not found.' } });
		} catch (error) {
			return response.status(error.status || 500).json({ error });
		}
	}

}
