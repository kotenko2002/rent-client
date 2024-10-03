import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useLandlordPropertyData from './useLandlordPropertyData';
import CitySelect from '../../CitySelect';
import { toast } from 'react-toastify';
import PropertyCarousel from '../../PropertyCarousel';
import PropertyService from "../../../../services/PropertyService";
import { Tab, Nav } from 'react-bootstrap';
import ResponsesList from "./ResponsesList";

const LandlordPropertyPage = () => {
    const { propertyId } = useParams();
    const navigate = useNavigate();
    const {
        propertyData,
        setPropertyData, uploadedPhotos,
        setUploadedPhotos,
        loading,
        error
    } = useLandlordPropertyData(propertyId);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const handlePropertyChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            setPropertyData({ ...propertyData, [name]: Array.from(files) });
        } else {
            setPropertyData({ ...propertyData, [name]: value });
        }

        setHasUnsavedChanges(true);
    };

    const handleDeletePhoto = (photo) => {
        setUploadedPhotos((prevPhotos) => prevPhotos.filter((item) => item.id !== photo.id));
        setPropertyData((prevState) => ({
            ...prevState,
            photoIdsToDelete: [...prevState.photoIdsToDelete, photo.id]
        }));

        setHasUnsavedChanges(true);
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

    const handleDeleteProperty = async () => {
        const confirmDelete = window.confirm("Ви впевнені, що хочете видалити цю нерухомість?");
        if (confirmDelete) {
            const success = await PropertyService.deleteProperty(propertyId);
            if (success) {
                toast.success("Нерухомість успішно видалена!");
                navigate('/landloardproperties');
            }
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
                    <PropertyCarousel photos={uploadedPhotos} onDelete={handleDeletePhoto} />
                </div>

                <div className="col-md-6 mt-3">
                    <Tab.Container defaultActiveKey="generalInfo">
                        <Nav variant="underline">
                            <Nav.Item>
                                <Nav.Link eventKey="generalInfo">Загальна інформація</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="reviews">Відгуки</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content className="mt-2">
                            <Tab.Pane eventKey="generalInfo">
                                <div className="card card-body">
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
                                            <label>Додати фотографії</label>
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

                                    <button onClick={handleDeleteProperty} className="btn btn-danger w-100 mt-3">
                                        Видалити власність
                                    </button>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="reviews">
                                <ResponsesList propertyId={propertyId}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>
        </div>
    );
};

export default LandlordPropertyPage;
