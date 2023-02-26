import { Grid, Typography } from '@mui/material';
import React from 'react';

import Footer from '../../components/Footer';
import Login from '../../components/LoginSignup/Login';
import MyPaper from '../../components/LoginSignup/MyPaper';

function LoginPage() {
    return (
        <Grid
            container
            spacing={0}
            width="100vw"
            height="calc(100vh - 40px)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
        >
            <Grid item>
                <Typography variant="h6" color="initial">
                    Seja bem-vindo
                </Typography>
                <MyPaper elevation={12}>
                    <Login />
                </MyPaper>
                <Footer />
            </Grid>
        </Grid>
    );
}

export default LoginPage;
