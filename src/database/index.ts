import options from '../configs/database'
import mysql, { Connection, ConnectionOptions, QueryError } from 'mysql2';

import * as run from './commands/index'

export interface connectionInterface {
    connection: Connection,
    options: ConnectionOptions
}

const connection = mysql.createConnection({
    host: options.host,
    user: options.user,
    password: options.password,
    multipleStatements: true
});

const errorQuery = (err: QueryError) => {
    err
    console.log(`❌ Error: ${err}`);
    process.exit(0);
}

console.log(`\n\n[1/10] 🔨 start creating the database...`);
Promise.resolve({ connection, options })
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