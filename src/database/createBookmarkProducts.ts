import { connectionInterface } from './index';

export default ({ connection, options }: connectionInterface) => {
    return new Promise<connectionInterface>((resolve, reject) => {

        const sqlCreateTable = `
            use ${options.database};

            CREATE TABLE bookmark_products (
                id CHAR(36) NOT NULL,
                customer_id CHAR(36) NOT NULL,
                title VARCHAR(80) NOT NULL,
                price DECIMAL(6,2) NOT NULL,
                review FLOAT(3,2) NULL,
                created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                INDEX fk_bookmark_products_idx (customer_id ASC) VISIBLE,
                CONSTRAINT fk_bookmark_products
                  FOREIGN KEY (customer_id)
                  REFERENCES customers (id)
                  ON DELETE CASCADE
                  ON UPDATE CASCADE);
              
            `;


        connection.query(sqlCreateTable, (err, result) => {

            if (err && err?.errno !== 1050) {
                return reject(err);
            }

            console.log(`[4/4] 📖 ${err && err.errno === 1050 ? err.message : 'created bookmark_products table'}...`);

            connection.end(err => {

                if (err)
                    return reject(err);

                console.log(`\n✨  database and tables successfully created...\n`);
                return resolve();
            });
        });
    });
}

