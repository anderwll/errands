import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LayoutDefault from '../config/layout';
import DashboardPage from '../pages/DashboardPage';
import ErrandsPage from '../pages/ErrandsPage';
import FiledPage from '../pages/FiledPage';
import LoginPage from '../pages/LoginPage';
import SettingsPage from '../pages/SettingsPage';
import SignupPage from '../pages/SignupPage';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/cadastro" element={<SignupPage />} />
                <Route
                    path="/dashboard"
                    element={<LayoutDefault component={<DashboardPage />} />}
                />
                <Route path="/recados" element={<LayoutDefault component={<ErrandsPage />} />} />
                <Route path="/arquivados" element={<LayoutDefault component={<FiledPage />} />} />
                <Route
                    path="/configuracoes"
                    element={<LayoutDefault component={<SettingsPage />} />}
                />

                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
