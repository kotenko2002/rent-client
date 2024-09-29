import React, { useState, useEffect } from 'react';

const NotFoundOrUnauthorized = () => {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {showMessage && <h1>404 - Page Not Found or 401 Unauthorized</h1>}
        </>
    );
};

export default NotFoundOrUnauthorized;
