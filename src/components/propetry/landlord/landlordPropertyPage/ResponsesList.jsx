import React, { useEffect, useState } from 'react';
import ResponseService from '../../../../services/ResponseService';
import { toast } from 'react-toastify';

const ResponsesList = ({ propertyId }) => {
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const data = await ResponseService.getResponsesByPropertyId(propertyId);
                if (data) {
                    setResponses(data);
                } else {
                    setError('Не вдалося отримати відповіді');
                }
            } catch (err) {
                setError('Сталася помилка під час отримання відповідей');
            } finally {
                setLoading(false);
            }
        };

        fetchResponses();
    }, [propertyId]);

    /*
    const getStatusLabel = (status) => {
        switch (status) {
            case 0:
                return 'Не переглянуто';
            case 1:
                return 'Схвалено для діалогу';
            case 2:
                return 'Схвалено для оренди';
            case 3:
                return 'Відхилено';
            default:
                return 'Невідомий статус';
        }
    };
    */

    if (loading) {
        return <p>Завантаження відгуків...</p>;
    }

    if (error) {
        toast.error(error);
        return <p>{error}</p>;
    }

    if (responses.length === 0) {
        return <p>Відгуки відсутні</p>;
    }

    return (
        <div>
            {responses.map((response) => (
                <div key={response.id} className="card mb-3">
                    <div className="card-body">
                        <p>Email: <em>{response.email}</em></p>
                        <p>Номер телефону: <em>{response.phoneNumber}</em></p>
                        <p>Повідомлення: <em>{response.message}</em></p>
                        {/* <p><strong>Статус: </strong>{getStatusLabel(response.status)}</p> */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ResponsesList;
