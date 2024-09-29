import React from 'react';
import {useNavigate} from "react-router-dom";

const PropertyList = ({ properties }) => {
    const navigate = useNavigate();

    const handleDetailsBtnClick = (propertyId) => {
        const userRole = sessionStorage.getItem('userRole');

        if (userRole === 'Landlord') {
            navigate(`/landloardproperties/${propertyId}`)
        } else if (userRole === 'Tenant') {
            //navigate("/")
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Список об’єктів вашої нерухомості</h2>
            <div className="row">
                {properties.map(property => (
                    <div className="col-12 col-md-6 mb-4" key={property.id}>
                        <div style={{
                            display: 'flex',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            padding: '10px'
                        }}>
                            <img
                                src={property.photoUrl}
                                alt={property.address}
                                style={{
                                    width: '100px',
                                    marginRight: '15px'
                                }}
                            />
                            <div style={{flexGrow: 1}}>
                                <p><strong>Місто: </strong>{property.cityName}</p>
                                <p><strong>Адреса: </strong>{property.address}</p>
                                <p><strong>Ціна: </strong>{property.price} UAH</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleDetailsBtnClick(property.id)}
                                >
                                    Переглянути деталі
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PropertyList;
