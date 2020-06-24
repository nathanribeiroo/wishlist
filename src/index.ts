import app from './configs/server';

// starts server
app.listen(parseInt(process.env.PORT) || 80, process.env.HOST || "0.0.0.0", () => {
    console.log('\n======================');
    console.log(' ✅ Server is running ');   
    console.log('======================\n');
});
