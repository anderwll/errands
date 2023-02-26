import { Alert, AlertTitle, Grid } from '@mui/material';
import React from 'react';

interface MyAlertProps {
    open: boolean;
    type: 'error' | 'success';
    info: string;
}

function MyAlert({ open, type, info }: MyAlertProps) {
    return (
        <Grid item position="fixed" top="15px" zIndex="99" width="285px">
            {open && type === 'success' && (
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {info}
                </Alert>
            )}

            {open && type === 'error' && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {info}
                </Alert>
            )}
        </Grid>
    );
}

export default MyAlert;
