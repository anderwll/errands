import { Grid, Typography } from '@mui/material';
import React from 'react';

function Footer() {
    return (
        <Grid
            item
            width="100vw"
            textAlign="center"
            sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                padding: 1,
                background: 'transparent',
            }}
        >
            <Typography variant="subtitle2" color="#707070">
                © Copyright anderwll | 2023 - v1.0
            </Typography>
        </Grid>
    );
}

export default Footer;
