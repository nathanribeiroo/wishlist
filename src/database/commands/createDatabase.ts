import { connectionInterface } from '../index'

export const createDatabase = ({ connection, options }: connectionInterface) => {
    return new Promise<connectionInterface>((resolve, reject) => {
        connection.connect((err => {

            if (err)
                return reject(err);

            connection.execute(`CREATE DATABASE ${options.database}`, (err, result) => {
                if (err) {

                    if (err.errno === 1007) {
                        console.log(`[2/10] 💾 ${err.message}...`);
                        return resolve({ connection, options });
                    }
                    
                    return reject(err);
                }

                   
                console.log(`[2/10] 💾 ${options.database} database created...`);
                return resolve({ connection, options });
            }); 
        }))
    });
}