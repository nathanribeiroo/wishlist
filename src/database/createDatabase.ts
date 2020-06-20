import { connectionInterface } from './index'

export default ({ connection, options }: connectionInterface) => {
    return new Promise<connectionInterface>((resolve, reject) => {
        connection.connect((err => {

            if (err)
                return reject(err);

            connection.execute(`CREATE DATABASE ${options.database}`, (err, result) => {
                if (err) {

                    if (err.errno === 1007) {
                        console.log(`[2/4] 💾 ${err.message}...`);
                        return resolve({ connection, options });
                    }
                    
                    return reject(err);
                }

                   
                console.log(`[2/4] 💾 ${options.database} database created...`);
                return resolve({ connection, options });
            }); 
        }))
    });
}