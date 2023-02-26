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
}

function ButtonRegistration({ icon, color }: ButtonRegistrationProps) {
    const handleAlert = () => {
        alert('Tente novamente mais tarde');
    };

    return (
        <Fab color={color} sx={{ width: '45px', height: '45px' }} onClick={handleAlert}>
            {icon}
        </Fab>
    );
}

export default ButtonRegistration;
