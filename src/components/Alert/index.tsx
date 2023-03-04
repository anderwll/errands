import { Alert, Snackbar } from '@mui/material';
import React from 'react';

export type TypeAlert = 'error' | 'success' | 'warning';

interface MyAlertProps {
    open?: boolean;
    type?: TypeAlert;
    info?: string;
    handleClose?: () => void;
}

function MyAlert({ open, type, info, handleClose }: MyAlertProps) {
    return (
        <Snackbar
            open={open || open}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        >
            <Alert severity={type}>{info}</Alert>
        </Snackbar>
    );
}

export default MyAlert;
