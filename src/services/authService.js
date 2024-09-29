import axiosInstance from './axiosConfig';

class AuthService {
    static async register(username, role, email, phone, password) {
        const url = '/auth/register';
        const data = {
            username,
            role,
            email,
            phone,
            password,
        };

        try {
            const response = await axiosInstance.post(url, data);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }

    static async login(username, password) {
        const url = '/auth/login';
        const data = {
            username,
            password,
        };

        try {
            const response = await axiosInstance.post(url, data);
            if (response.status === 200) {
                localStorage.setItem("accessToken", response.data.accessToken.token);
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }
}

export default AuthService;
