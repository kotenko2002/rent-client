import { useState, useEffect } from 'react';
import PropertyService from '../../../../services/PropertyService';

const useLandlordPropertyData = (propertyId) => {
    const [propertyData, setPropertyData] = useState({
        cityId: "",
        address: "",
        description: "",
        price: 0,
        photos: [],
        photoIdsToDelete: []
    });
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await PropertyService.getPropertyFullInfoById(propertyId);
                setPropertyData({
                    cityId: data.cityId,
                    address: data.address,
                    description: data.description,
                    price: data.price,
                    photoIdsToDelete: []
                });
                setUploadedPhotos(data.photos || []);
            } catch (err) {
                setError('Не вдалося отримати інформацію про нерухомість.');
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [propertyId]);

    return { propertyData, setPropertyData, uploadedPhotos, setUploadedPhotos, loading, error };
};

export default useLandlordPropertyData;
