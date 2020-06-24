import { connectionInterface } from '../index';

export const createPrAddProducts = ({ connection, options }: connectionInterface) => {
    return new Promise<connectionInterface>((resolve, reject) => {   
        const sqlCreateTable = `
        USE ${options.database};
        DROP procedure IF EXISTS pr_add_product;

        CREATE PROCEDURE pr_add_product(
        IN _product_id CHAR(36),
        IN _customer_id CHAR(36),
        IN _title VARCHAR(80),
        IN _price DECIMAL(6,2),
        IN _review FLOAT(3,2) 
        )
        BEGIN

        SET @customer = (SELECT id FROM customers WHERE id = _customer_id);

        IF @customer IS NOT NULL THEN
            
        SET @product = (SELECT id FROM products WHERE product_id = _product_id AND customer_id = _customer_id);

        IF @product IS NULL THEN
            
            INSERT INTO products (product_id, customer_id, title, price, review)
            VALUES (_product_id, _customer_id, _title, _price, _review);
            
            SELECT * FROM products WHERE product_id = _product_id AND customer_id = _customer_id;
            
        ELSE
            SELECT 'product already exists for this customer.' AS message, 400 AS status;
        END IF;
            
        ELSE
            SELECT 'customer not found.' AS message, 404 AS status;
        END IF;

        END
        `;

        connection.query(sqlCreateTable, (err, result) => {
            if (err){
                return reject(err);
            }

            console.log(`[7/10] 🚀 created procedure add_product...`);
            return resolve({ connection, options });
        });
    });
}