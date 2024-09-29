import React, { useState, useEffect } from "react";
import PropertyService from '../../../services/PropertyService';
import CityService from '../../../services/CityService';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function CreatePropertyPage() {
    const navigate = useNavigate();

    const [propertyData, setPropertyData] = useState({
        cityId: "",
        address: "",
        description: "",
        price: 0,
        photos: []
    });

    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const cityData = await CityService.getAllCities();
                setCities(cityData);
            } catch (error) {
                toast.error("Не вдалося завантажити міста.");
            }
        };

        fetchCities();
    }, []);

    const handlePropertyChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setPropertyData({ ...propertyData, [name]: Array.from(files) }); // Convert FileList to array
        } else {
            setPropertyData({ ...propertyData, [name]: value });
        }
    };

    const handlePropertySubmit = async (e) => {
        e.preventDefault();

        try {
            const success = await PropertyService.addNewProperty(
                propertyData.cityId,
                propertyData.address,
                propertyData.description,
                Number(propertyData.price), // Ensure price is a number
                propertyData.photos
            );

            if (success) {
                toast.success("Власність успішно додана!");
                setPropertyData({
                    cityId: "",
                    address: "",
                    description: "",
                    price: 0,
                    photos: []
                });
                navigate("/landloardproperties");
            }
        } catch (error) {
            console.error("Error submitting property:", error);
            toast.error("Не вдалося додати власність.");
        }
    };

    return (
        <form className="container mt-5" onSubmit={handlePropertySubmit} style={{ maxWidth: "500px" }}>
            <div className="form-group">
                <label>Виберіть місто</label>
                <select
                    className="form-control mb-2"
                    name="cityId"
                    value={propertyData.cityId}
                    onChange={handlePropertyChange}
                    required
                >
                    <option value="">Оберіть місто</option>
                    {cities.map(city => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>
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
            <div className="form-group">
                <label>Фотографії</label>
                <input
                    type="file"
                    className="form-control mb-2"
                    name="photos"
                    onChange={handlePropertyChange}
                    multiple
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
                Додати власність
            </button>
        </form>
    );
}

export default CreatePropertyPage;
