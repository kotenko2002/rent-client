import React, { useEffect, useState } from 'react';
import PropertyService from '../../../services/PropertyService';
import PropertyList from '../PropertyList';

const LandlordPropertiesPage = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await PropertyService.getProperties();
                setProperties(data);
            } catch (err) {
                setError('Не вдалося отримати об’єкти.');
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) {
        return <p>Завантаження...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <PropertyList properties={properties} />
    );
};

export default LandlordPropertiesPage;
