import { Grid, Typography } from '@mui/material';
import React from 'react';

import MyPaper from '../../components/LoginSignup/MyPaper';
import Signup from '../../components/LoginSignup/Signup';
import Spinner from '../../components/Spinner';

function SignupPage() {
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
                    <Signup />
                </MyPaper>
            </Grid>
            <Spinner />
        </Grid>
    );
}

export default SignupPage;
