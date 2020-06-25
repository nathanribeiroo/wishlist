import { dropDatabase } from '../../database';


Promise.resolve('test')
    .then(dropDatabase)
    .catch(err => {
        console.log(err);
        
    });