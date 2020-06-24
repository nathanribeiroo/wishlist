import { ModelApp } from './ModelApp';

// interface for save new products
export interface ProductSave {
    product_id: string,
    customer_id: string,
    title: string,
    price: Number,
    review: Number | null
}

// find by id
export interface ById {
    product_id: string,
    customer_id: string,
}

// list products
export interface Index {
    customer_id: string,
    link_image: string,
    link: string,
    product_id: string
}


/**
 * Class Product
 * 
 * 
 */
export default class Product extends ModelApp {

    /**
     * constructor
     * 
     */
    constructor() {
        super('products'); // table name
    }

    /**
     * List products by customers or 
     * show details of a customer's product.
     * 
     * @param { customer_id, link_image, link, product_id } Index
     */
    async list({ customer_id, link_image, link, product_id }: Index) {
        return new Promise((resolve, reject) => {

            // select which procedure to execute
            const sql = typeof product_id === 'undefined'
                ? `CALL pr_index_product('${customer_id}')`
                : `CALL pr_index_product_id('${customer_id}', '${product_id}')`;

            this.conn.query(sql, (err, result) => { // execute procedure
                this.conn.end(); // close connection

                if (err) return reject(err);  // if there is an error

                if (this.hasError(result)) {  // if there is an error in the procedure
                    return reject(this.formatReturn(result)[0]); // return data formatted
                }

                // recreates the list of products by adding images and links
                const products = this.formatReturn(result).map((objProduct: any) => {
                    let product: any = {
                        title: objProduct.title,
                        price: parseFloat(objProduct.price),
                        image: `${link_image}/${objProduct.product_id}.jpg`,
                    }

                    if (typeof product_id === 'undefined') { // creates the link because it is not a detail
                        product.link = `${link}/${objProduct.product_id}`;
                    }

                    if (objProduct.review !== null) { // add review if exists
                        product.review = objProduct.review
                    }

                    return product;
                });

                if (typeof product_id === 'undefined') {
                    return resolve(products); // return just obj
                }

                return resolve(products[0]); // return data array
            })
        })
    }

    /**
     * Adds a new product to a
     * customer's favorite list.
     * 
     * @param { product_id, customer_id, title, price, review } ProductSave
     */
    async create({ product_id, customer_id, title, price, review }: ProductSave) {
        return new Promise((resolve, reject) => {

            const sql = `CALL pr_add_product('${product_id}', '${customer_id}', '${title}', ${price}, ${review})`;

            this.conn.query(sql, (err, result) => { // execute procedure
                this.conn.end(); // close connection

                if (err) return reject(err); // if there is an error


                if (this.hasError(result)) {  // if there is an error in the procedure
                    return reject(this.formatReturn(result)[0]);
                }

                return resolve(this.formatReturn(result)[0]); // return data formatted
            })
        });
    }

    /**
     * Delete the product from the customer list.
     * 
     * @param { customer_id, product_id } ById 
     */
    async delete({ customer_id, product_id }: ById) {
        return new Promise((resolve, reject) => {

            const sql = `CALL pr_delete_product('${customer_id}', '${product_id}')`;

            this.conn.query(sql, (err, result) => { // execute procedure
                this.conn.end(); // close connection

                if (err) { // if there is an error
                    return reject(err);
                }

                if (this.hasError(result)) {  // if there is an error in the procedure
                    return reject(this.formatReturn(result)[0]); // return data formatted
                }

                return resolve(result); // return data 
            })
        })
    }
}