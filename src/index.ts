import app from './configs/server';

app.listen(process.env.PORT || 80, () => {
    console.log('\n======================');
    console.log(' ✅ Server is running ');   
    console.log('======================\n');
});
