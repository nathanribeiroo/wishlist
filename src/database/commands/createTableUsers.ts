import { connectionInterface } from '../index';
import * as bcrypt from 'bcrypt'

export const createTableUsers = ({ connection, options }: connectionInterface) => {
    return new Promise<connectionInterface>(async (resolve, reject) => {

        const password = await bcrypt.hash('*1234', 12);

        const sqlCreateTable = `
            use ${options.database};
            
            CREATE TABLE users (
                id int NOT NULL AUTO_INCREMENT,
                email varchar(45) NOT NULL,
                password varchar(60) NOT NULL,
                PRIMARY KEY (id)
              );
              
            

            INSERT INTO users (email, password) VALUES ('example@example.com', '${password}');

            
            `;

        connection.query(sqlCreateTable, (err, result) => {
            if (err){

                if (err.errno === 1050) {
                    console.log(`[5/10] 🔑 ${err.message}...`);
                    return resolve({ connection, options });
                }
                
                return reject(err);
            }

            console.log(`[5/10] 🔑 created users table...`);
            return resolve({ connection, options });
        });
    });
}