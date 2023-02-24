import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginSignup from '../pages/LoginSignup';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginSignup />} />
                <Route path="/home" element={<h1>Home</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
