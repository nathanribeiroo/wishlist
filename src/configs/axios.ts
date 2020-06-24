import axios from 'axios';

// create a new axios instance to connect with external api
const instance = axios.create({
    baseURL: 'http://challenge-api.luizalabs.com',
    timeout: 1000
});

export default instance;