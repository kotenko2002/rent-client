import React, { useState } from 'react';
import PropertyService from '../../../services/PropertyService';
import PropertyList from '../PropertyList';
import CitySelect from '../CitySelect';

const SearchPropertyPage = () => {
    const [properties, setProperties] = useState([]);
    const [cityId, setCityId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchPropertiesByCityId = async (selectedCityId) => {
        if (!selectedCityId) {
            setError('Оберіть місто.');
            return;
        }

        setLoading(true);
        setError(''); // Очищаємо попередні помилки
        try {
            const data = await PropertyService.getPropertiesByCityId(selectedCityId);
            setProperties(data);
        } catch (err) {
            setError('Не вдалося отримати об’єкти.');
        } finally {
            setLoading(false);
        }
    };

    const handleCityChange = (e) => {
        const selectedCityId = e.target.value;
        setCityId(selectedCityId);
        fetchPropertiesByCityId(selectedCityId); // Оновлюємо список властивостей при зміні міста
    };

    if (loading) {
        return <p>Завантаження...</p>;
    }

    return (
        <div className="container mt-5">
            <CitySelect value={cityId} onChange={handleCityChange} />
            {error && <p>{error}</p>}
            <PropertyList properties={properties} />
        </div>
    );
};

export default SearchPropertyPage;
