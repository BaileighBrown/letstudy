// allows use to communicate with api 
// axios makes sending asynchronous HTTP requests to REST endpoints easier and helps you perform CRUD operations.
import axios from 'axios';
import { logout } from './shared/utils/auth';

const apiClient = axios.create({
    baseURL: 'http://localhost:5002/api',
    timeout: 1000,
});

apiClient.interceptors.request.use((config)=>{
    const userDetails = localStorage.getItem('user');
//if we get any tokens from he user details 
    if(userDetails){
    const token = JSON.parse(userDetails).token;
    config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (err) => {
    return Promise.reject(err);
})

//public routes, whats available on the outside 
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

//secure routes for only the returned tokens are correct
const checkResponseCode = (exception) => {
    const responseCode = exception?.response?.status;

    if (responseCode){
        (responseCode === 401 || responseCode === 403) && logout();
    }
}