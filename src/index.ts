import { createDatabase } from './database';
import app from './configs/server';

const start = async () => {

    console.log('\n========================');
    console.log(` 🚀 Environment: ${process.env.APP_ENVIRNMENT.toUpperCase()}`);

    // create database if necessary
    await createDatabase(process.env.APP_ENVIRNMENT)

    // start serveryarn
    app.listen(parseInt(process.env.PORT) || 80, process.env.HOST || "0.0.0.0", () => {
        console.log('------------------------');
        console.log(' ✅ Server:      OK ');
        console.log('========================');
    });
}

// starts server
start(); 
