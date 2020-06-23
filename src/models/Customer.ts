import { ModelApp } from './ModelApp';


interface dataCreate {
    name?: string,
    email?: string
}

export default class Customer extends ModelApp {

    constructor() {
        super('customers');
    }

    findById(id: string) {
        return new Promise((resolve, reject) => {
            this.conn.query(`SELECT * FROM ${this.table} WHERE id = '${id}'`, (err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(result);
            });
        });
    }

    create({ name, email }: dataCreate) {
        return new Promise((resolve, reject) => {
            this.conn.query(`CALL pr_add_customer('${name}', '${email}')`, (err, result) => {
                if (err) {
                    return reject(err);
                }

                if (this.hasError(result)) {
                    return reject(this.formatReturn(result)[0]);
                }

                resolve(this.formatReturn(result)[0]);
            });
        });
    }

    update(id: string, object: dataCreate) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE ${this.table} SET 
            ${Object.entries(object).map(([key, value]) => `${key} = '${value}'`).join(', ')}
            WHERE id = '${id}'`;

            this.conn.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }

                this.conn.query(`SELECT * FROM ${this.table} WHERE id = '${id}'`, (err, result) => {

                    if (err) {
                        return reject(err);
                    }

                    this.conn.end();
                    return resolve(result);
                })
            });
        });
    }

    delete(id: string) {
        return new Promise((resolve, reject) => {
            this.conn.query(`DELETE FROM ${this.table} WHERE id = '${id}'`, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }


}