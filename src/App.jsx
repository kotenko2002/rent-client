import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/home/Home";
import NotFoundOrUnauthorized from "./components/shared/NotFoundOrUnauthorized";
import About from "./components/shared/About";
import Header from "./components/shared/Header";
import AuthPage from "./components/auth/AuthPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React, {useEffect} from "react";
import extractRoleAndStore from "./helpers/extractRoleAndStore";

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
                        <Route path="/about" element={<About />} />
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
