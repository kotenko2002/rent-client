import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropertyService from '../../../services/PropertyService';
import CitySelect from '../CitySelect';
import { toast } from 'react-toastify';
import Carousel from 'react-bootstrap/Carousel';

const LandlordPropertyPage = () => {
    const { propertyId } = useParams();
    const navigate = useNavigate();
    const [propertyData, setPropertyData] = useState({
        cityId: "",
        address: "",
        description: "",
        price: 0,
        photos: [],
        photoIdsToDelete: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false); // New state for tracking changes

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

    const handlePropertyChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            setPropertyData({ ...propertyData, [name]: Array.from(files) });
        } else {
            setPropertyData({ ...propertyData, [name]: value });
        }

        setHasUnsavedChanges(true); // Set flag to true on change
    };

    const handleDeletePhoto = (photo) => {
        setUploadedPhotos((prevPhotos) => prevPhotos.filter((item) => item.id !== photo.id));
        setPropertyData((prevState) => ({
            ...prevState,
            photoIdsToDelete: [...prevState.photoIdsToDelete, photo.id]
        }));

        setHasUnsavedChanges(true); // Set flag to true on photo deletion
    };

    const handlePropertySubmit = async (e) => {
        e.preventDefault();

        const success = await PropertyService.editProperty(
            propertyId,
            propertyData.cityId,
            propertyData.address,
            propertyData.description,
            Number(propertyData.price),
            propertyData.photos,
            propertyData.photoIdsToDelete
        );

        if (success) {
            toast.success("Власність успішно оновлена!");
            window.location.reload();
        }
    };

    if (loading) {
        return <p>Завантаження...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mt-5">
            <h1>Інформація про нерухомість</h1>
            <div className="row">
                <div className="col-md-6 mt-3">
                    <Carousel className="carousel-left" style={{ maxHeight: '500px', maxWidth: '100%' }}>
                        {uploadedPhotos.map((photo, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={photo.url}
                                    alt={`Фото ${index + 1}`}
                                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                                />
                                <Carousel.Caption>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeletePhoto(photo)}
                                    >
                                        Видалити
                                    </button>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>

                <div className="col-md-6 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handlePropertySubmit}>
                                <div className="form-group">
                                    <CitySelect
                                        value={propertyData.cityId}
                                        onChange={handlePropertyChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Адреса</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        name="address"
                                        value={propertyData.address}
                                        onChange={handlePropertyChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Опис</label>
                                    <textarea
                                        className="form-control mb-2"
                                        name="description"
                                        value={propertyData.description}
                                        onChange={handlePropertyChange}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Ціна грн/місяць</label>
                                    <input
                                        type="number"
                                        className="form-control mb-2"
                                        name="price"
                                        value={propertyData.price}
                                        onChange={handlePropertyChange}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Фотографії</label>
                                    <input
                                        type="file"
                                        className="form-control mb-2"
                                        name="photos"
                                        onChange={handlePropertyChange}
                                        multiple
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 mt-3" disabled={!hasUnsavedChanges}>
                                    Оновити власність
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandlordPropertyPage;
