import { connectionInterface } from '../index';
import md5 from 'md5'

export const createTableUsers = ({ connection, options }: connectionInterface) => {
    return new Promise<connectionInterface>((resolve, reject) => {

        const sqlCreateTable = `
            use ${options.database};
            
            CREATE TABLE users (
                id int NOT NULL AUTO_INCREMENT,
                email varchar(45) NOT NULL,
                password varchar(60) NOT NULL,
                PRIMARY KEY (id)
              );
              
            

            INSERT INTO users (email, password) VALUES ('example@example.com', '${md5('1234')}');
            INSERT INTO users (email, password) VALUES ('test@luizalabs.com', '${md5('12345')}');

            
            `;

        connection.query(sqlCreateTable, (err, result) => {
            if (err){

                if (err.errno === 1050) {
                    // console.log(`[5/10] 🔑 ${err.message}...`);
                    return resolve({ connection, options });
                }
                
                return reject(err);
            }

            // console.log(`[5/10] 🔑 created users table...`);
            return resolve({ connection, options });
        });
    });
}