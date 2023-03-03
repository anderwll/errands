import { Typography, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MyCard from '../../components/Errrand/Card';
import Spinner from '../../components/Spinner';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getErrands, handleErrands } from '../../store/modules/errands/errandsSlice';

function ErrandsPage() {
    const dataOfErrands = useAppSelector(handleErrands);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const getIdLocalStorage = () => {
        return JSON.parse(localStorage.getItem('idUserLogged') || '');
    };

    useEffect(() => {
        if (!getIdLocalStorage()) {
            navigate('/');
        }

        dispatch(getErrands(getIdLocalStorage()));
    }, [navigate]);

    return (
        <Grid container spacing={2} width="calc(100vw - 80px)" display="flex">
            <Grid item xs={12}>
                <Typography variant="h4" color="initial">
                    Meus recados
                </Typography>
            </Grid>

            {dataOfErrands &&
                dataOfErrands.map((e) => {
                    return (
                        <MyCard
                            key={e.id}
                            title={e.title}
                            description={e.description}
                            date={e.date}
                            onClickEdit={() => alert(`Editar ${e.id}`)}
                            onClickDelet={() => alert(`Deletar ${e.id}`)}
                            onClickArchive={() => alert(`Arquivar ${e.id}`)}
                            isChecked={e.check}
                            onClickCheck={() => alert(`Check ${e.id}`)}
                        />
                    );
                })}

            <Spinner />
        </Grid>
    );
}

export default ErrandsPage;
