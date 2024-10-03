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
            if (error.response.status === 401 && window.location.pathname !== '/auth') {
                localStorage.removeItem('accessToken');
                window.location.href = '/auth';
            } else if (error.response.status >= 300) {
                if (error.response.data.message) {
                    toast.error(error.response.data.message);
                } else if (error.response.data.errors) {
                    Object.keys(error.response.data.errors).forEach((field) => {
                        error.response.data.errors[field].forEach((message) => {
                            toast.error(message);
                        });
                    });
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
