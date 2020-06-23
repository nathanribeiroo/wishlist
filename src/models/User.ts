import { ModelApp } from './ModelApp';

export default class Customer extends ModelApp {

    constructor() {
        super('users');
    }


    auth(email: string) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users WHERE email = '${email}'`;

            this.conn.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }

                return resolve(result);
            });

        });
    }


}