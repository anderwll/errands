import { createTheme } from '@mui/material';
import { blue, purple } from '@mui/material/colors';

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: blue[500],
            dark: blue[500],
            light: blue[500],
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: purple[500],
            dark: purple[500],
            light: purple[500],
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#D3D3D3',
            paper: '#ffff',
        },
    },
    typography: {
        allVariants: {
            color: 'black',
        },
    },
});
