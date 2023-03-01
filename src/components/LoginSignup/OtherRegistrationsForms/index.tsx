import { Facebook, Twitter, Google } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

import MyAlert from '../../Alert';
import ButtonRegistration from './ButtonRegistration';

function OtherRegistrationsForms() {
    const [open, setOpen] = useState(false);

    const handleCloseAlert = () => {
        setOpen(!open);
    };

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
                <ButtonRegistration
                    icon={<Facebook />}
                    color="primary"
                    onClick={handleCloseAlert}
                />
                <ButtonRegistration icon={<Twitter />} color="info" onClick={handleCloseAlert} />
                <ButtonRegistration icon={<Google />} color="error" onClick={handleCloseAlert} />
            </Grid>
            <MyAlert
                open={open}
                handleClose={handleCloseAlert}
                type="warning"
                info="Tente novamente mais tarde."
            />
        </Grid>
    );
}

export default OtherRegistrationsForms;
