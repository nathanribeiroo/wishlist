import { createDatabase } from '../../database';


Promise.resolve('test')
    .then(createDatabase)
    .catch(err => {
        console.log(err);

    });