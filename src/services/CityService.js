import axiosInstance from './axiosConfig';

class CityService {
    static async getAllCities() {
        const url = '/city/items';

        try {
            const response = await axiosInstance.get(url);
            if (response.status === 200) {
                return response.data;
            }
            return [];
        } catch (error) {
            console.error('Помилка під час отримання міст:', error);
            return [];
        }
    }
}

export default CityService;
