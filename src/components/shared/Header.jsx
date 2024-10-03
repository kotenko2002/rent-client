import React from 'react';
import {useNavigate} from "react-router-dom";

const Header = ({isAuthed, role}) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("accessToken");
        window.location.reload();
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" onClick={() => navigate("/")} role="button">Rent Service</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {role === "Tenant" &&
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => navigate("/searchproperty")} role="button">Пошук житла</a>
                                </li>
                            </>
                        }

                        {role === "Landlord" &&
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => navigate("/landloardproperties")} role="button">Моя нерухомість</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={() => navigate("/newproperty")} role="button">Додати об'єкт</a>
                                </li>
                            </>
                        }
                    </ul>
                    <span className="navbar-text">
                        {
                            isAuthed
                                ? <button className="btn btn-outline-primary btn-sm" type="submit" onClick={logout}>Вийти</button>
                            : <button className="btn btn-outline-primary btn-sm" type="submit" onClick={() => navigate("/auth")}>Увійти</button>
                        }
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Header;
