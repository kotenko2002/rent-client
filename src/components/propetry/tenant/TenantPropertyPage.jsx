import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropertyService from '../../../services/PropertyService';
import { Carousel } from 'react-bootstrap';

const TenantPropertyPage = () => {
    const { propertyId } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await PropertyService.getPropertyFullInfoById(propertyId);
                setProperty(data);
            } catch (err) {
                setError('Не вдалося отримати інформацію про нерухомість.');
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [propertyId]);

    if (loading) {
        return <p>Завантаження...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!property) {
        return <p>Інформація відсутня.</p>;
    }

    return (
        <div className="container mt-5">
            <h1>Інформація про нерухомість</h1>
            <div className="row">
                {/* Ліва колонка з каруселлю */}
                <div className="col-md-6">
                    {property.photos && property.photos.length > 0 && (
                        <Carousel className="carousel-left" style={{ maxHeight: '500px', maxWidth: '100%' }}>
                            {property.photos.map((photo) => (
                                <Carousel.Item key={photo.id}>
                                    <img
                                        className="d-block w-100"
                                        src={photo.url}
                                        alt={`Фото ${photo.id}`}
                                        style={{ maxHeight: '500px', objectFit: 'cover' }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    )}
                </div>

                {/* Права колонка з інформацією */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-text">Місто: {property.cityName}</p>
                            <p className="card-text">Адреса: {property.address}</p>
                            <p className="card-text">Опис: {property.description}</p>
                            <p className="card-text">Ціна: {property.price} грн</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TenantPropertyPage;
