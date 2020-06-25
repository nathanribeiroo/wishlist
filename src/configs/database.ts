import { ConnectionOptions } from 'mysql2';
import { joinNameDb } from '../database'
// config to connect database
const opt: ConnectionOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: joinNameDb(process.env.APP_ENVIRNMENT)
}

export default opt;