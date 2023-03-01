import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ErrandsPage from '../pages/ErrandsPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/cadastro" element={<SignupPage />} />
                <Route path="/recados" element={<ErrandsPage />} />

                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
