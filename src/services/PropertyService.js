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

    static async editProperty(id, cityId, address, description, price, photos, photoIdsToDelete) {
        const url = '/property/landlord';
        const formData = new FormData();

        formData.append('id', id);
        if (cityId) formData.append('cityId', cityId);
        if (address) formData.append('address', address);
        if (description) formData.append('description', description);
        if (price) formData.append('price', price);

        if (photos) {
            photos.forEach(photo => {
                formData.append('photos', photo);
            });
        }

        if (photoIdsToDelete) {
            photoIdsToDelete.forEach(photoId => {
                formData.append('photoIdsToDelete', photoId);
            });
        }

        try {
            const response = await axiosInstance.patch(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.status === 200;
        } catch (error) {
            console.error('Помилка редагування нерухомості:', error);
            return false;
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

    static async getPropertiesByLandlord() {
        const url = '/property/landlord/items';

        try {
            const response = await axiosInstance.get(url);
            return response.data;
        } catch (error) {
            console.error('Помилка отримання нерухомостей:', error);
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

    static async deleteProperty(propertyId) {
        const url = `/property/landlord/${propertyId}`;

        try {
            const response = await axiosInstance.delete(url);
            return response.status === 200;
        } catch (error) {
            console.error(`Помилка видалення нерухомості за ID ${propertyId}:`, error);
            return false;
        }
    }
}

export default PropertyService;
