import { Fab } from '@mui/material';
import React from 'react';

interface ButtonRegistrationProps {
    icon: any;
    color:
        | 'error'
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'default'
        | 'success'
        | 'info'
        | 'warning'
        | undefined;
    onClick: () => void;
}

function ButtonRegistration({ icon, color, onClick }: ButtonRegistrationProps) {
    return (
        <Fab color={color} sx={{ width: '45px', height: '45px' }} onClick={onClick}>
            {icon}
        </Fab>
    );
}

export default ButtonRegistration;
