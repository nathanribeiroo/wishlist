import { ConnectionOptions } from 'mysql2';

const opt: ConnectionOptions = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'wishlist',
    connectionLimit: 10,
    queueLimit: 0
}

export default opt;