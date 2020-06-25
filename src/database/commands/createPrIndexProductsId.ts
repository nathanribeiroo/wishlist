import { connectionInterface } from '../index';

export const createPrIndexProductsId = ({ connection, options }: connectionInterface) => {
    return new Promise<connectionInterface>((resolve, reject) => {   
        const sqlCreateTable = `
        USE ${options.database};
        DROP procedure IF EXISTS pr_index_product_id;

        CREATE PROCEDURE pr_index_product_id(
        IN _customer_id CHAR(36),
        IN _product_id CHAR(36)
        )
        BEGIN

        SET @customer = (SELECT id FROM customers WHERE id = _customer_id);

        IF @customer IS NOT NULL THEN
            SELECT 
                product_id,
                review,
                title,
                price
            FROM products WHERE customer_id = _customer_id AND product_id = _product_id;
        ELSE
            SELECT 'customer not found.' AS message, 404 AS status; 
        END IF;

        END
        `;

        connection.query(sqlCreateTable, (err, result) => {
            if (err){
                return reject(err);
            }

            // console.log(`[9/10] 🚀 created procedure index_product_id...`);
            return resolve({ connection, options });
        });
    });
}