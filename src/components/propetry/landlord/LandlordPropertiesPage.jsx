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
                const data = await PropertyService.getPropertiesByLandlord();
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
        <div className="container mt-5">
            <PropertyList properties={properties} />
        </div>
    );
};

export default LandlordPropertiesPage;
