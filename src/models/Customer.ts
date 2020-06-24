import { ModelApp } from './ModelApp';

// creation data 
interface dataCreate {
    name?: string,
    email?: string
}

/**
 * Class Customer Model
 * 
 */
export default class Customer extends ModelApp {

    /**
     * constructor
     * 
     */
    constructor() {
        super('customers'); // table name
    }

    /**
     * Find the customer by id.
     * 
     * @param id string | customer id
     */
    findById(id: string) {
        return new Promise((resolve, reject) => {
            this.conn.query(`SELECT * FROM ${this.table} WHERE id = '${id}'`, (err, result) => { // execute the query
                this.conn.end(); // close de connection

                if (err) { return reject(err); } //  if there is an error

                
                return resolve(result); // return select
            });
        });
    }

    /**
     * Create new customer.
     * 
     * @param param0 dataCreate  
     */
    create({ name, email }: dataCreate) {
        return new Promise((resolve, reject) => {
            this.conn.query(`CALL pr_add_customer('${name}', '${email}')`, (err, result) => { // execute the procedure
                this.conn.end(); // close the connection

                if (err) { //  if there is an error
                    return reject(err);
                }

                if (this.hasError(result)) { // if there is an error in the procedure
                    return reject(this.formatReturn(result)[0]);
                }

                
                resolve(this.formatReturn(result)[0]); // return data
            });
        });
    }

    /**
     * Updated customer.
     * 
     * @param id 
     * @param object 
     */
    update(id: string, object: dataCreate) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE ${this.table} SET 
            ${Object.entries(object).map(([key, value]) => `${key} = '${value}'`).join(', ')}
            WHERE id = '${id}'`; // create query

            this.conn.query(sql, (err, result) => { // execute the update
                if (err) {  //  if there is an error
                    this.conn.end();
                    return reject(err);
                }

                this.conn.query(`SELECT * FROM ${this.table} WHERE id = '${id}'`, (err, result) => { // select new values
                    this.conn.end();  // close the connection

                    if (err) {
                        return reject(err);
                    }

                    
                    return resolve(result); // return select
                })
            });
        });
    }

    /**
     * Delete customer.
     * 
     * @param id 
     */
    delete(id: string) {
        return new Promise((resolve, reject) => {
            this.conn.query(`DELETE FROM ${this.table} WHERE id = '${id}'`, (err, result) => {
                this.conn.end();  // close the connection
                if (err) { //  if there is an error
                    return reject(err); 
                }
                return resolve(result); // return
            });
        });
    }


}