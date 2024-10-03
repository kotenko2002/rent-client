import React from 'react';
import { useNavigate } from "react-router-dom";

const PropertyList = ({ properties }) => {
    const navigate = useNavigate();

    const handleDetailsBtnClick = (propertyId) => {
        const userRole = sessionStorage.getItem('userRole');

        if (userRole === 'Landlord') {
            navigate(`/landloardproperties/${propertyId}`);
        } else if (userRole === 'Tenant') {
            navigate(`/tenantproperty/${propertyId}`);
        }
    };

    return (
        <div>
            <h2 className="mb-4">Список об’єктів вашої нерухомості</h2>
            <div className="row">
                {properties.length === 0 ? (
                    <div className="col-12">
                        <p className="text-center">Список пустий</p>
                    </div>
                ) : (
                    properties.map(property => (
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
                                <div style={{ flexGrow: 1 }}>
                                    <p>Місто: <em>{property.cityName}</em></p>
                                    <p>Адреса: <em>{property.address}</em></p>
                                    <p>Ціна: <em>{property.price} грн/місяць</em></p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleDetailsBtnClick(property.id)}
                                    >
                                        Переглянути деталі
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PropertyList;
