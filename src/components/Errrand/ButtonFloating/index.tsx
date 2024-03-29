import { Add } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';
import React from 'react';

interface ButtonFloatingProps {
    onClick: () => void;
}

function ButtonFloating({ onClick }: ButtonFloatingProps) {
    return (
        <Box sx={{ position: 'fixed', bottom: 10, right: 10 }}>
            <Fab color="secondary" variant="extended" onClick={onClick} sx={{ p: 3 }}>
                Novo
                <Add sx={{ ml: 1 }} />
            </Fab>
        </Box>
    );
}

export default ButtonFloating;
