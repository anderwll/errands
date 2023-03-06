import { Grid, Typography } from '@mui/material';
import React from 'react';

function SettingsPage() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h3" color="initial">
                    Configurações
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body1" color="#707070" sx={{ fontStyle: 'italic' }}>
                    Essa página está em produção... disponível na v2.0
                </Typography>
            </Grid>
        </Grid>
    );
}

export default SettingsPage;
