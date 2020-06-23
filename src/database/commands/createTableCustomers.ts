import { connectionInterface } from '../index';

export const createTableCustomers = ({ connection, options }: connectionInterface) => {
    return new Promise<connectionInterface>((resolve, reject) => {

        const sqlCreateTable = `
            use ${options.database};

            CREATE TABLE customers (
                id CHAR(36) NOT NULL,
                name VARCHAR(45) NOT NULL,
                email VARCHAR(45) NOT NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE INDEX email_UNIQUE (email ASC)
            )
            `;


        connection.query(sqlCreateTable, (err, result) => {
            if (err){

                if (err.errno === 1050) {
                    console.log(`[3/10] 👦 ${err.message}...`);
                    return resolve({ connection, options });
                }
                
                return reject(err);
            }

            console.log(`[3/10] 👦 created customers table...`);
            return resolve({ connection, options });
        });
    });
}