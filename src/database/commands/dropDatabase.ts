import { connectionInterface } from '../index';
import * as bcrypt from 'bcrypt'

export const dropDatabase = ({ connection, options }: connectionInterface) => {
    return new Promise<connectionInterface>(async (resolve, reject) => {

        const sqlCreateTable = `DROP DATABASE ${options.database};`;

        connection.query(sqlCreateTable, (err, result) => {
            connection.end();
            if (err){
                
                if (err.errno === 1008) {
                    console.log(`🗑  ${err.message}...`);
                    return resolve({ connection, options });
                }
                
                return reject(err);
            }

            console.log(`🗑  drop database ${options.database} success...`);
            return resolve();
        });
    });
}