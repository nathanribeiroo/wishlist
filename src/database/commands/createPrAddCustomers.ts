import { connectionInterface } from '../index';

export const createPrAddCustomers = ({ connection, options }: connectionInterface) => {
    return new Promise<connectionInterface>((resolve, reject) => {   
        const sqlCreateTable = `
        USE ${options.database};
        DROP procedure IF EXISTS pr_add_customer;

        CREATE PROCEDURE pr_add_customer(
        IN _name VARCHAR(45),
        IN _email VARCHAR(45)
        )
        BEGIN

        SET @customer = (SELECT id FROM customers WHERE email = _email);

        IF @customer IS NULL THEN

            SET @uuid = (SELECT UUID());
            
            INSERT INTO customers (id, name, email) 
            VALUES (@uuid,_name,_email);
            
            SELECT * FROM customers WHERE id = @uuid;
                
        ELSE
            SELECT 'It was not possible to create a customer, because the email already exists.' AS message, 400 AS status;  
        END IF;

        END
        `;

        connection.query(sqlCreateTable, (err, result) => {
            if (err){
                return reject(err);
            }

            console.log(`[6/10] 🚀 created procedure add_customer...`);
            return resolve({ connection, options });
        });
    });
}