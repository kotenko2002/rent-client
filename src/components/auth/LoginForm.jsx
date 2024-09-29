import React, { useState } from "react";
import AuthService from '../../services/AuthService';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom";

function LoginForm() {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const success = await AuthService.login(
                loginData.username,
                loginData.password
            );

            if (success) {
                toast.success("Успішний вхід");

                setLoginData({
                    username: "",
                    password: ""
                });

                navigate("/")
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
                <label>Користувацьке ім'я</label>
                <input
                    type="text"
                    className="form-control mb-2"
                    name="username"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Пароль</label>
                <input
                    type="password"
                    className="form-control mb-2"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
                Увійти
            </button>
        </form>
    );
}

export default LoginForm;
