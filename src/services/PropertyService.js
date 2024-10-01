import axiosInstance from './axiosConfig';

class PropertyService {
    static async addNewProperty(cityId, address, description, price, photos) {
        const url = '/property/landlord';
        const formData = new FormData();

        formData.append('cityId', cityId);
        formData.append('address', address);
        formData.append('description', description);
        formData.append('price', price);

        photos.forEach(photo => {
            formData.append('photos', photo);
        });

        try {
            const response = await axiosInstance.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.status === 200;
        } catch (error) {
            console.error('Помилка додавання нової нерухомості:', error);
            return false;
        }
    }

    static async getProperties() {
        const url = '/property/landlord/items';

        try {
            const response = await axiosInstance.get(url);
            return response.data;
        } catch (error) {
            console.error('Помилка отримання нерухомостей:', error);
            return [];
        }
    }

    static async getPropertiesByCityId(cityId) {
        const url = `/property/tenant/items/${cityId}`;

        try {
            const response = await axiosInstance.get(url);
            return response.data;
        } catch (error) {
            console.error('Помилка отримання нерухомостей за cityId:', error);
            return [];
        }
    }

    static async getPropertyFullInfoById(propertyId) {
        const url = `/property/item/${propertyId}`;

        try {
            const response = await axiosInstance.get(url);
            return response.data;
        } catch (error) {
            console.error(`Помилка отримання повної інформації про нерухомість за ID ${propertyId}:`, error);
            return null;
        }
    }
}

export default PropertyService;
