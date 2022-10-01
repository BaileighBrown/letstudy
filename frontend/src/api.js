// allows use to communicate with api 

// axios makes sending asynchronous HTTP requests to REST endpoints easier and helps you perform CRUD operations.
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5002/api',
    timeout: 1000,
});

// responsible for making a request to the server. here we are tring to connect the server side with the client side
export const login = async (data) => {
    try {
        return await apiClient.post('/auth/login', data);
    } catch (exception){
        return {
            error: true,
            exception,
        };
    }
};

export const register = async (data) => {
    try {
        return await apiClient.post('/auth/register', data)
    
    } catch (exception){
        return {
            error: true,
            exception,
        };
    }
};