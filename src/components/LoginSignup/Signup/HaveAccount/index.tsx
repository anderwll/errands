import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HaveAccount() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
    };

    return (
        <Grid item>
            <Typography variant="subtitle2" color="initial">
                Já possui conta?
            </Typography>
            <Button variant="text" color="inherit" onClick={handleNavigate}>
                Acesse
            </Button>
        </Grid>
    );
}

export default HaveAccount;
