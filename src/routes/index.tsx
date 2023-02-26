import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/cadastro" element={<SignupPage />} />
                <Route path="/home" element={<h1>Home</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
