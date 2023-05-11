import { createTheme } from '@mui/material';
import { blue, purple } from '@mui/material/colors';

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: blue[900],
            dark: blue[900],
            light: blue[900],
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: purple[900],
            dark: purple[900],
            light: purple[900],
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#303134',
            paper: '#4b4c4f',
        },
    },
    typography: {
        allVariants: {
            color: 'white',
        },
    },
});
