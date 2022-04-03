import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3334/',
    headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
    }
});

export default api;