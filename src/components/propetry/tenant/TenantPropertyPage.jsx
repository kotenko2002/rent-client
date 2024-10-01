import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropertyService from '../../../services/PropertyService';
import ResponseService from '../../../services/ResponseService';
import { Carousel, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaQuestionCircle } from 'react-icons/fa';

const TenantPropertyPage = () => {
    const { propertyId } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await ResponseService.addNewResponse(propertyId, message);
        if (success) {
            toast.success('Запит успішно надіслано');
        }
    };

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
                <div className="col-md-6 mt-3">
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

                <div className="col-md-6 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-text">Місто: <em>{property.cityName}</em></p>
                            <p className="card-text">Адреса: <em>{property.address}</em></p>
                            <p className="card-text">Опис: <em>{property.description}</em></p>
                            <p className="card-text">Ціна: <em>{property.price} грн/місяць</em></p>
                        </div>
                    </div>

                    <div className="card mt-3">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="message">
                                        Напишіть повідомлення власнику
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip id="tooltip-message">
                                                    Напишіть повідомлення, в якому ви коротко розкажете про себе: хто ви, чим займаєтесь, і чому вам варто довірити оренду квартири. Поясніть, чому ви відповідальний орендар і надайте аргументи, які допоможуть власнику відчути впевненість у вашій кандидатурі.
                                                </Tooltip>
                                            }
                                        >
                                            <span className="ms-2" style={{ cursor: 'pointer' }}>
                                                <FaQuestionCircle />
                                            </span>
                                        </OverlayTrigger>
                                    </label>
                                    <textarea
                                        id="message"
                                        className="form-control"
                                        rows="4"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100 mt-3">
                                    Відправити запит на проживання
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TenantPropertyPage;
