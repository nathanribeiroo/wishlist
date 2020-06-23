import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://challenge-api.luizalabs.com',
    timeout: 1000
});

export default instance;