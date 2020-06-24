import { connectionInterface } from '../index';

export const createPrIndexProducts = ({ connection, options }: connectionInterface) => {
    return new Promise<connectionInterface>((resolve, reject) => {   
        const sqlCreateTable = `
        USE ${options.database};
        DROP procedure IF EXISTS pr_index_product;

        CREATE PROCEDURE pr_index_product(
        IN _customer_id CHAR(36)
        )
        BEGIN

        SET @customer = (SELECT id FROM customers WHERE id = _customer_id);

        IF @customer IS NOT NULL THEN
            SELECT 
                product_id,
                review,
                title,
                price
            FROM products WHERE customer_id = _customer_id;
        ELSE
            SELECT 'customer not found.' AS message, 404 AS status; 
        END IF;

        END
        `;

        connection.query(sqlCreateTable, (err, result) => {
            if (err){
                return reject(err);
            }

            console.log(`[8/10] 🚀 created procedure index_product...`);
            return resolve({ connection, options });
        });
    });
}