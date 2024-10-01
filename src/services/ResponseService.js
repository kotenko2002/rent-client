import axiosInstance from './axiosConfig';

class ResponseService {
    static async addNewResponse(propertyId, message) {
        const url = '/response/tenant/add';
        const data = {
            propertyId,
            message,
        };

        try {
            const response = await axiosInstance.post(url, data);
            return response.status === 200;
        } catch (error) {
            console.error('Помилка додавання відповіді:', error);
            return false;
        }
    }

    static async getResponsesByPropertyId(propertyId) {
        const url = `/response/landlord/items/${propertyId}`;

        try {
            const response = await axiosInstance.get(url);
            if (response.status === 200) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.error('Помилка отримання відповідей:', error);
            return null;
        }
    }

    static async processResponse(responseId, status) {
        const url = '/response/landlord/process';
        const data = {
            responseId,
            status,
        };

        try {
            const response = await axiosInstance.patch(url, data);
            return response.status === 200;
        } catch (error) {
            console.error('Помилка обробки відповіді:', error);
            return false;
        }
    }
}

export default ResponseService;
