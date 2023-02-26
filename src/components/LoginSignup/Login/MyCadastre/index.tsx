import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MyCadastre() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/cadastro');
    };

    return (
        <Grid item>
            <Typography variant="subtitle2" color="initial">
                Ou cadastre-se usando
            </Typography>
            <Button variant="text" color="inherit" onClick={handleNavigate}>
                Cadastro
            </Button>
        </Grid>
    );
}

export default MyCadastre;
