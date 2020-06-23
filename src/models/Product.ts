import { ModelApp } from './ModelApp';


export interface ProductSave {
    product_id: string,
    customer_id: string,
    title: string,
    price: Number,
    review: Number | null
}

export interface ById {
    product_id: string,
    customer_id: string,
}

export interface Index {
    customer_id: string,
    link_image: string,
    link: string,
    product_id: string
}


/**
 * Class Products
 * 
 * 
 */
export default class Products extends ModelApp {

    constructor() {
        super('products');
    }

    async list({ customer_id, link_image, link, product_id }: Index) {
        return new Promise((resolve, reject) => {

            const sql = typeof product_id === 'undefined' 
            ? `CALL pr_index_product('${customer_id}')` 
            : `CALL pr_index_product_id('${customer_id}', '${product_id}')` ;

            this.conn.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }

                if (this.hasError(result)) {
                    return reject(this.formatReturn(result)[0]);
                }

                const products = this.formatReturn(result).map((objProduct: any) => {
                    let product: any = {
                        title: objProduct.title,
                        price: parseFloat(objProduct.price),
                        image: `${link_image}/${objProduct.product_id}.jpg`,
                    }

                    if(typeof product_id === 'undefined') {
                        product.link = `${link}/${objProduct.product_id}`;
                    }

                    if (objProduct.review !== null) {
                        product.review = objProduct.review
                    }

                    return product;
                }); 

                return resolve(products);
            })
        })
    }

    async create({ product_id, customer_id, title, price, review }: ProductSave) {
        return new Promise((resolve, reject) => {

            const sql = `CALL pr_add_product('${product_id}', '${customer_id}', '${title}', ${price}, ${review})`;

            this.conn.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }

                if (this.hasError(result)) {
                    return reject(this.formatReturn(result)[0]);
                }

                return resolve(this.formatReturn(result)[0]);
            })
        });
    }

    async delete({customer_id, product_id}: ById) {
        return new Promise((resolve, reject) => {

            const sql = `CALL pr_delete_product('${customer_id}', '${product_id}')`;

            this.conn.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(result);
            })
        })
    }
}