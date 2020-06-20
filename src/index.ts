import './lib/env'
import app from './configs/server';

app.listen(process.env.PORT || 3000, () => {
    console.log('\n======================');
    console.log(' ✅ Server is running ');   
    console.log('======================\n');
});
