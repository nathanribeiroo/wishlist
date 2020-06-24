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

if (process.env.DB_DROP || false) {  // check if it is to delete or create the bank
    console.log(`\n\n🔨 start drop database...`);
    Promise.resolve({ connection, options: { database: process.env.DB_NAME } }) // starts process and check the creation environment (prod or test) 
        .then(run.dropDatabase) 
        .catch(errorQuery)
} else {
    console.log(`\n\n[1/10] 🔨 start creating the database...`);
    Promise.resolve({ connection, options: { database: process.env.DB_NAME } }) // starts process and check the creation environment (prod or test) 
        .then(run.createDatabase)
        .then(run.createTableCustomers)
        .then(run.createTableProducts)
        .then(run.createTableUsers)
        .then(run.createPrAddCustomers)
        .then(run.createPrAddProducts)
        .then(run.createPrIndexProducts)
        .then(run.createPrIndexProductsId)
        .then(run.createPrDeleteProduct)
        .catch(errorQuery)
}