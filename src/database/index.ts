import options from '../configs/database'
import mysql, { Connection, ConnectionOptions, QueryError } from 'mysql2';

import createDatabase from './createDatabase';
import createTableCustomers from './createTableCustomers';
import createBookmarkProducts from './createBookmarkProducts';

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

console.log(`\n\n[1/4] 🔨 start creating the database...`);
Promise.resolve({ connection, options })
    .then(createDatabase)
    .then(createTableCustomers)
    .then(createBookmarkProducts)
    .catch(errorQuery)


