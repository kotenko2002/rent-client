import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const TabType = {
    REGISTER: "register",
    LOGIN: "login",
};

function AuthPage() {
    const [activeTab, setActiveTab] = useState(TabType.REGISTER);

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === TabType.REGISTER ? "active" : ""}`}
                        onClick={() => setActiveTab(TabType.REGISTER)}
                        role="button"
                    >
                        Зареєструватись
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab === TabType.LOGIN ? "active" : ""}`}
                        onClick={() => setActiveTab(TabType.LOGIN)}
                        role="button"
                    >
                        Увійти
                    </a>
                </li>
            </ul>

            <div className="tab-content mt-3">
                {activeTab === TabType.REGISTER && (
                    <div className="tab-pane active">
                        <RegisterForm />
                    </div>
                )}

                {activeTab === TabType.LOGIN && (
                    <div className="tab-pane active">
                        <LoginForm />
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthPage;
