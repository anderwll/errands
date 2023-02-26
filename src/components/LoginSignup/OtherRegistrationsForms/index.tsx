import { Facebook, Twitter, Google } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import React from 'react';

import ButtonRegistration from './ButtonRegistration';

function OtherRegistrationsForms() {
    return (
        <Grid item>
            <Typography variant="subtitle2" color="initial">
                Ou cadastre-se usando
            </Typography>
            <Grid
                item
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    marginTop: '10px',
                }}
            >
                <ButtonRegistration icon={<Facebook />} color="primary" />
                <ButtonRegistration icon={<Twitter />} color="info" />
                <ButtonRegistration icon={<Google />} color="error" />
            </Grid>
        </Grid>
    );
}

export default OtherRegistrationsForms;
