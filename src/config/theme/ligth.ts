import { createTheme } from '@mui/material';
import { blue, purple } from '@mui/material/colors';

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: blue[700],
            dark: blue[800],
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
            default: '#f6abb8',
            paper: '#ffff',
        },
    },
    typography: {
        allVariants: {
            color: 'black',
        },
    },
});
