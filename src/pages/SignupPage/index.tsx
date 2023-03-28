import { Grid } from '@mui/material';
import React, { useEffect } from 'react';

import MyPaper from '../../components/LoginSignup/MyPaper';
import Signup from '../../components/LoginSignup/Signup';
import Spinner from '../../components/Spinner';

function SignupPage() {
    useEffect(() => {
        document.title = 'Cadastro | RecadosApp';
    }, []);

    return (
        <Grid
            container
            spacing={0}
            width="100vw"
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            sx={{
                background:
                    'linear-gradient(45deg, rgba(166,209,236,1) 0%, rgba(129,152,214,1) 32%, rgba(220,49,222,1) 100%)',
            }}
        >
            <Grid item>
                <MyPaper elevation={12}>
                    <Signup />
                </MyPaper>
            </Grid>
            <Spinner />
        </Grid>
    );
}

export default SignupPage;
