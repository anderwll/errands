import { ThemeProvider } from '@mui/material';
import React from 'react';

import { LightTheme } from './config/theme';
import AppRoutes from './routes';

function App() {
    return (
        <ThemeProvider theme={LightTheme}>
            <AppRoutes />
        </ThemeProvider>
    );
}

export default App;
