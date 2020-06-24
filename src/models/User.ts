import { ModelApp } from './ModelApp';

/**
 * Class User
 * 
 * just to authenticate
 * 
 */
export default class User extends ModelApp {

    /**
     * constructor
     * 
     */
    constructor() {
        super('users'); // table name
    }

    /**
     * Select on the user that contains the email.
     * 
     * @param email string | user email 
     */
    auth(email: string) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users WHERE email = '${email}'`; // execute select

            this.conn.query(sql, (err, result) => {
                this.conn.end(); // close connection

                if (err) { // if there is an error
                    return reject(err);
                }

                return resolve(result); // return select
            });

        });
    }


}