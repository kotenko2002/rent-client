import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropertyService from '../../../services/PropertyService';
import ResponseService from '../../../services/ResponseService';
import PropertyCarousel from '../PropertyCarousel';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
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
                    <PropertyCarousel photos={property.photos} />
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
                                    <label htmlFor="message">Повідомлення власнику</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="form-control"
                                        rows="3"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 mt-3">
                                    Надіслати запит
                                </button>
                            </form>
                        </div>
                    </div>

                    <OverlayTrigger
                        overlay={
                            <Tooltip>
                                Напишіть власнику для отримання додаткової інформації або домовленості про оренду
                            </Tooltip>
                        }
                    >
                        <FaQuestionCircle className="text-muted mt-3" />
                    </OverlayTrigger>
                </div>
            </div>
        </div>
    );
};

export default TenantPropertyPage;
