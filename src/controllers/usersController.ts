import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import check from './validator';

import User from '../models/User';

/**
 * usersController
 * 
 * just to authenticate
 * 
 */
export default {

	/**
	 * Function for user to authenticate.
	 * 
	 * @param request Request
	 * @param response Response
	 */
	async login(request: Request, response: Response) {
		try {
			const { email, password } = request.body;

			// validate email and password
			check.isEmail(email);
			check.isEmpty(password, 'password');

			const user = new User();
			const result: any = await user.auth(email); // search user by email

			if (result.length === 0) { // check exists user
				return response.status(404).json({ error: { message: 'user not found.' } });
			}

			if (md5(password) === result[0].password) { // compares database password with unsigned password
				const token = jwt.sign({ id: result[0].id }, process.env.APP_SECRET, { // creates a new token
					expiresIn: parseInt(process.env.EXPIRES_IN) // expires in 30 with default
				});
				
				return response.json({ email, token }); // return token with email 
			}

			return response.status(404).json({ error: { message: 'user not found.' } });
		} catch (error) {
			return response.status(error.status || 500).json({ error }); // error | check | User 
		}
	}

}
