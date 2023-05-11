import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';

function DashboardPage() {
    useEffect(() => {
        document.title = 'Dashboard | RecadosApp';
    }, []);

    return (
        <Grid item>
            <Grid item xs={12}>
                <Typography variant="h3">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body1" color="#707070" sx={{ fontStyle: 'italic' }}>
                    Essa página está em produção... disponível na v2.0
                </Typography>
            </Grid>
        </Grid>
    );
}

export default DashboardPage;
