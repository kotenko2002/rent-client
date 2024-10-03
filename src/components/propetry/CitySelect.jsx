import React, { useState, useEffect } from "react";
import CityService from '../../services/CityService';
import { toast } from 'react-toastify';

function CitySelect({ value, onChange, labelText }) {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            const cityData = await CityService.getAllCities();
            setCities(cityData);
        };

        fetchCities();
    }, []);

    return (
        <div className="form-group">
            <label>{labelText || 'Виберіть місто'}</label>
            <select
                className="form-control mb-2"
                name="cityId"
                value={value}
                onChange={onChange}
                required
            >
                <option value="" disabled>Оберіть місто</option>
                {cities.map(city => (
                    <option key={city.id} value={city.id}>
                        {city.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default CitySelect;
