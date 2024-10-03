import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/home/Home";
import NotFoundOrUnauthorized from "./components/shared/NotFoundOrUnauthorized";
import Header from "./components/shared/Header";
import AuthPage from "./components/auth/AuthPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React, {useEffect} from "react";
import extractRoleAndStore from "./helpers/extractRoleAndStore";
import CreatePropertyPage from "./components/propetry/landlord/CreatePropertyPage";
import PropertyList from "./components/propetry/PropertyList";
import LandlordPropertiesPage from "./components/propetry/landlord/LandlordPropertiesPage";
import LandlordPropertyPage from "./components/propetry/landlord/landlordPropertyPage/LandlordPropertyPage";
import SearchPropertyPage from "./components/propetry/tenant/SearchPropertyPage";
import TenantPropertyPage from "./components/propetry/tenant/TenantPropertyPage";

function App() {
    const [isAuthed, setIsAuthed] = React.useState(false);
    const [role, setRole] = React.useState(null);

    useEffect(() => {
        const { accessToken, role} = extractRoleAndStore();

        if(accessToken)
        {
            setIsAuthed(true);
            if(role) setRole(role);
        }
    }, []);

    return (
        <Router>
            <Header isAuthed={isAuthed} role={role}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthPage/>} />
                <Route path="*" element={<NotFoundOrUnauthorized />} />

                {isAuthed &&
                    <>
                        <Route path="/newproperty" element={<CreatePropertyPage />} />
                        <Route path="/landloardproperties" element={<LandlordPropertiesPage />} />
                        <Route path="/landloardproperties/:propertyId" element={<LandlordPropertyPage />} />

                        <Route path="/searchproperty" element={<SearchPropertyPage />} />
                        <Route path="/tenantproperty/:propertyId" element={<TenantPropertyPage />} />
                    </>
                }
            </Routes>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Router>
    );
}

export default App;
