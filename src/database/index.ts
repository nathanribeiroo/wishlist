/**
 * Script file to just create
 * or delete the databases.
 * 
 * its function is to facilitate the
 * development and testing.
 * 
 * 
 */

import '../configs/env';
import mysql, { Connection, QueryError } from 'mysql2';

import * as run from './commands/index';

export interface connectionInterface {
    connection: Connection,
    options: {
        database: String
    }
}

// create a new connection with database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    multipleStatements: true
});

/**
 * Function if something goes
 * wrong in creating the database. 
 *  
 * @param err QueryError
 */
const errorQuery = (err: QueryError) => {
    console.log(`❌ Error: ${err} \n\n try again, please!`);
    process.exit(0);
}

/**
 * Concat NODE_ENV with name database
 * @param name name database
 */
export const joinNameDb = (name?: string) => {
    return name === 'test' ? `${process.env.DB_NAME}_test`
        : name === 'development' || name === 'dev' ? `${process.env.DB_NAME}_dev` : `${process.env.DB_NAME}_prod`;
}

const dropDb = (database?: string) => {
    return new Promise((resolve, reject) => {
        Promise.resolve({ connection, options: { database: joinNameDb(database) } }) // starts process and check the creation environment (prod or test) 
            .then(run.dropDatabase)
            .then(() => {
                resolve(database);
            })
            .catch(errorQuery)
    });
    // console.log(`\n\n🔨 start drop database...`);

}
const createDb = (database?: string) => {

    // console.log(`\n\n[1/10] 🔨 start creating the database...`);
    return Promise.resolve({ connection, options: { database: joinNameDb(database) } }) // starts process and check the creation environment (prod or test) 
        .then(run.createDatabase)
        .then(run.createTableCustomers)
        .then(run.createTableProducts)
        .then(run.createTableUsers)
        .then(run.createPrAddCustomers)
        .then(run.createPrAddProducts)
        .then(run.createPrIndexProducts)
        .then(run.createPrIndexProductsId)
        .then(run.createPrDeleteProduct)
        .catch(errorQuery);

}

export const createDatabase = createDb;
export const dropDatabase = dropDb;