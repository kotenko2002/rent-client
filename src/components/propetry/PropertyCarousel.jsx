import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const PropertyCarousel = ({ photos, onDelete }) => {
    return (
        <Carousel className="carousel-left" style={{ height: '500px', maxWidth: '100%' }}>
            {photos.map((photo, index) => (
                <Carousel.Item key={photo.id || index}>
                    <img
                        className="d-block w-100"
                        src={photo.url}
                        alt={`Фото ${index + 1}`}
                        style={{ height: '500px', objectFit: 'cover' }}
                    />
                    {onDelete && (
                        <Carousel.Caption>
                            <button
                                className="btn btn-danger"
                                onClick={() => onDelete(photo)}
                            >
                                Видалити
                            </button>
                        </Carousel.Caption>
                    )}
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default PropertyCarousel;
