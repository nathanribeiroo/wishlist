import { Request, Response } from 'express';
import check from './validator';
import listProducts from '../configs/axios';

import Product, { ProductSave } from '../models/Product';

export default {

	async index(request: Request, response: Response) {
		try {
			const { id, productId } = request.params;

			check.isUuid('id customer', id);
			check.isUuid('id product', productId);

			const product = new Product();

			const products: any = await product.list({
				customer_id: id,
				link_image: `${listProducts.defaults.baseURL}/images`,
				link: `http://${request.get('host')}/customers/${id}/products`,
				product_id: productId
			});

			return response.json(products);
		} catch (error) {
			return response.status(error.status || 500).json({ error });
		}
	},

	async create(request: Request, response: Response) {
		try {
			const { productId } = request.body;
			const { id } = request.params;

			check.isUuid('id customer', id);
			check.isUuid('id product', productId);

			if (typeof productId === 'undefined') {
				return response.status(400).json({ error: { message: "field 'productId' not exist in request.", status: 400 } })
			}

			const res = await listProducts.get(`/api/product/${productId}`);

			const { title, price, reviewScore } = res.data;

			const product: ProductSave = {
				product_id: productId,
				customer_id: id,
				title: title,
				price: price,
				review: null
			};

			if (typeof reviewScore !== 'undefined') {
				product.review = reviewScore;
			}

			const model = new Product();
			const result: any = await model.create(product);

			return response.json(result);
		} catch (error) {
			return response.status(error.status || 500).json({ error });
		}
	},

	async delete(request: Request, response: Response) {
		try {
			const { id, productId } = request.params;

			check.isUuid('id customer', id);
			check.isUuid('id product', productId);

			const product = new Product();
			const result: any = await product.delete({ customer_id: id, product_id: productId });

			if (result.affectedRows > 0) {
				return response.status(204).send();
			}

			return response.status(404).json({ error: { message: 'product not found.', status: 404 } });
		} catch (error) {
			return response.status(error.status || 500).json({ error });
		}
	}

}
