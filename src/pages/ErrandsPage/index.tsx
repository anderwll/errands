import { AccountCircle, Menu } from '@mui/icons-material';
import { AppBar, Box, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';

function ErrandsPage() {
    const responseOfUserLogged = useAppSelector((state) => state.userLogged);
    // const responseOfUsers = useAppSelector((state) => state.users);
    // const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (!responseOfUserLogged.success) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        console.log(responseOfUserLogged);
    }, [responseOfUserLogged]);

    return (
        <Grid container>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="transparent">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Meus Recados
                        </Typography>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        </Grid>
    );
}

export default ErrandsPage;
