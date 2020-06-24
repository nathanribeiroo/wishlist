import { connectionInterface } from '../index';

export const createPrDeleteProduct = ({ connection, options }: connectionInterface) => {
    return new Promise<connectionInterface>((resolve, reject) => {
        const sqlCreateTable = `
        USE ${options.database};
        DROP procedure IF EXISTS pr_delete_product;

        CREATE PROCEDURE pr_delete_product(
        IN _customer_id CHAR(36),
        IN _product_id CHAR(36)
        )
        BEGIN
        
        SET @customer = (SELECT id FROM customers WHERE id = _customer_id);
        
        IF @customer IS NOT NULL THEN
            DELETE FROM products WHERE customer_id = _customer_id AND product_id = _product_id;
        ELSE
            SELECT 'customer not found.' AS message, 404 AS status; 
        END IF;
        
        END
        `;

        connection.query(sqlCreateTable, (err, result) => {
            if (err) {
                return reject(err);
            }

            console.log(`[10/10] 🚀 created procedure delete_product...`);
            connection.end(err => {
                if (err)
                    return reject(err);

                console.log(`\n✨  database, tables and procedures successfully created...\n`);
            });
        });
    });
}