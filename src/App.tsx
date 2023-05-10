import { ThemeProvider } from '@mui/material';
import React, { useState, useEffect } from 'react';

import { DarkTheme, LightTheme } from './config/theme';
import AppRoutes from './routes';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getUserById } from './store/modules/userLogged/userLoggedSlice';
import { attUser } from './store/modules/users/usersSlice';

export const ThemeContext = React.createContext({
    darkMode: false,
    toggleDarkMode: () => {},
});

function App() {
    const getIdLocalStorage = () => {
        return JSON.parse(localStorage.getItem('idUserLogged') || '');
    };

    const dispatch = useAppDispatch();
    const userOfLoading = useAppSelector((state) => state.users.loading);
    const userLoggedDarkMode = useAppSelector(
        (state) => state.userLogged.data?.darkMode,
    ) as boolean;
    const [darkMode, setDarkMode] = useState(userLoggedDarkMode);

    const toggleDarkMode = () => {
        dispatch(attUser({ id: getIdLocalStorage(), darkMode: !darkMode }));
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        if (!userOfLoading) {
            dispatch(getUserById(getIdLocalStorage()));
        }
    }, []);

    let teste = 0;

    useEffect(() => {
        if (teste <= 0) {
            setDarkMode(userLoggedDarkMode);
            teste += 1;
        }
    }, [userLoggedDarkMode]);

    const theme = darkMode ? DarkTheme : LightTheme;

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <ThemeProvider theme={theme}>
                <AppRoutes />
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default App;
