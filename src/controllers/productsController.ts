import { Request, Response } from 'express';
import check from './validator';
import listProducts from '../configs/axios';

import Product, { ProductSave } from '../models/Product';

/**
 * productsController
 * 
 * FUNCTIONS - LIST | ADD | DELETE products
 * 
 */
export default {

	/**
	 * Lists all or specific products of the customer.
	 * 
	 * send id customer and product
	 * 
	 * @param request Request
	 * @param response Response
	 */
	async index(request: Request, response: Response) {
		try {
			const { id, productId } = request.params; // received params

			// validate id's
			check.isUuid('id customer', id);
			check.isUuid('id product', productId);

			const product = new Product(); // new instance

			const products: any = await product.list({ // creates a new list with the customer products
				customer_id: id,
				link_image: `${listProducts.defaults.baseURL}/images`, // create link image api
				link: `http://${request.get('host')}/customers/${id}/products`, // creates link of detail product
				product_id: productId
			});

			if (products) // if exists
				return response.json(products); // return products

			return response.status(404).json({ error: { message: 'product not found' } }); // product not found

		} catch (error) {
			return response.status(error.status || 500).json({ error }); // error | check | product 
		}
	},

	/**
	 * Create all or specific products of the customer.
	 * 
	 * send id customer and product
	 * 
	 * @param request Request
	 * @param response Response
	 */
	async create(request: Request, response: Response) {
		try {
			const { productId } = request.body;
			const { id } = request.params;

			// validate id's
			check.isUuid('id customer', id);
			check.isUuid('id product', productId);

			if (typeof productId === 'undefined') { // check id prodcuts param is undefined
				return response.status(400).json({ error: { message: "field 'productId' not exist in request.", status: 400 } })
			}

			const res = await listProducts.get(`/api/product/${productId}`); // get product in api

			const { title, price, reviewScore } = res.data; 

			const product: ProductSave = { // creates object product save
				product_id: productId,
				customer_id: id,
				title: title,
				price: price,
				review: null
			};

			if (typeof reviewScore !== 'undefined') { // if review is different from undefined, fill in the field
				product.review = reviewScore;
			}

			const model = new Product();
			const result: any = await model.create(product); // create product

			return response.json(result); // show
		} catch (error) {
			return response.status(error.status || 500).json({ error }); // error | check | product 
		}
	},

	/**
	 * Delete products of the customer.
	 * 
	 * send id customer and product
	 * 
	 * @param request Request
	 * @param response Response
	 */
	async delete(request: Request, response: Response) {
		try {
			const { id, productId } = request.params;

			// validate id's
			check.isUuid('id customer', id);
			check.isUuid('id product', productId);

			const product = new Product();
			const result: any = await product.delete({ customer_id: id, product_id: productId }); // delete 

			if (result.affectedRows > 0) { // if it is greater than zero
				return response.status(204).send(); // product deleted, show status 204 and no content
			}

			return response.status(404).json({ error: { message: 'product not found.', status: 404 } }); // produtc not found
		} catch (error) {
			return response.status(error.status || 500).json({ error }); // error | check | product 
		}
	}

}
