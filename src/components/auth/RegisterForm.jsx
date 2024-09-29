import React, { useState } from "react";
import AuthService from '../../services/AuthService';
import { toast } from 'react-toastify';

function RegisterForm() {
    const [registerData, setRegisterData] = useState({
        username: "",
        role: "Tenant",
        email: "",
        phone: "",
        password: ""
    });

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        try {
            const success =await AuthService.register(
                registerData.username,
                registerData.role,
                registerData.email,
                registerData.phone,
                registerData.password
            );

            if (success) {
                toast.success("Реєстрація пройшла успішно");

                setRegisterData({
                    username: "",
                    role: "Tenant",
                    email: "",
                    phone: "",
                    password: ""
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
                <label>Користувацьке ім'я</label>
                <input
                    type="text"
                    className="form-control mb-2"
                    name="username"
                    value={registerData.username}
                    onChange={handleRegisterChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Роль</label>
                <select
                    className="form-control mb-2"
                    name="role"
                    value={registerData.role}
                    onChange={handleRegisterChange}
                >
                    <option value="Tenant">Орендар</option>
                    <option value="Landlord">Орендодавець/Господар</option>
                </select>
            </div>
            <div className="form-group">
                <label>Пошта</label>
                <input
                    type="email"
                    className="form-control mb-2"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Номер телефону</label>
                <input
                    type="tel"
                    className="form-control mb-2"
                    name="phone"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Пароль</label>
                <input
                    type="password"
                    className="form-control mb-2"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
                Зареєструватись
            </button>
        </form>
    );
}

export default RegisterForm;
