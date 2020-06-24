import { ConnectionOptions } from 'mysql2';

// config to connect database
const opt: ConnectionOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}

export default opt;