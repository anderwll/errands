import { Typography, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUserById } from '../../store/modules/userLogged/userLoggedSlice';

function ErrandsPage() {
    const responseOfUserLogged = useAppSelector((state) => state.userLogged);
    // const responseOfUsers = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const getIdLocalStorage = () => {
        return JSON.parse(localStorage.getItem('idUserLogged') || '');
    };

    useEffect(() => {
        if (!getIdLocalStorage()) {
            navigate('/');
        }

        dispatch(getUserById(getIdLocalStorage()));
    }, [navigate]);

    return (
        <Grid item>
            <Typography variant="h4" color="initial">
                Página recados
            </Typography>
        </Grid>
    );
}

export default ErrandsPage;
