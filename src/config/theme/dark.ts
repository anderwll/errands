import { createTheme } from '@mui/material';
import { blue, purple } from '@mui/material/colors';

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: blue[400],
            dark: blue[400],
            light: blue[500],
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: purple[500],
            dark: purple[400],
            light: purple[300],
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#202124',
            paper: '#303134',
        },
    },
    typography: {
        allVariants: {
            color: 'white',
        },
    },
});
