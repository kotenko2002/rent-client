import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7023',
    //timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status >= 300 && error.response.data.message) {
                toast.error(error.response.data.message);
            }
            if (error.response.status === 401 && window.location.pathname !== '/auth') {
                window.location.href = '/auth';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
