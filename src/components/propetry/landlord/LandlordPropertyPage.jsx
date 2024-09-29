import {useParams} from "react-router-dom";

const LandlordPropertyPage = () => {
    const { propertyId } = useParams();

    return (
        <>
            {propertyId}
        </>
    );
}

export default LandlordPropertyPage;