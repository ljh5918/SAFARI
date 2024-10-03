import axios from 'axios';

export const createAxios = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': `http://localhost:8080`,
        'Content-Type': 'application/json',
    }
});


