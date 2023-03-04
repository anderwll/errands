import { Typography, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MyAlert, { TypeAlert } from '../../components/Alert';
import ButtonFloating from '../../components/Errrand/ButtonFloating';
import MyCard from '../../components/Errrand/Card';
import MyModal from '../../components/Errrand/MyModal';
import MyModalConfirm from '../../components/Errrand/MyModalConfirm';
import Spinner from '../../components/Spinner';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getErrands, handleErrands } from '../../store/modules/errands/errandsSlice';

function ErrandsPage() {
    const [openModal, setOpenModal] = useState(false);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [idErrand, setIdErrand] = useState('');

    const [openAlert, setOpenAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState<TypeAlert>('success');
    const [infoAlert, setInfoAlert] = useState('');

    const responseOfErrands = useAppSelector((state) => state.errands);
    const dataOfErrands = useAppSelector(handleErrands);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const getIdLocalStorage = () => {
        return JSON.parse(localStorage.getItem('idUserLogged') || '');
    };

    const handleAlert = (info: string, type: TypeAlert) => {
        setInfoAlert(info);
        setTypeAlert(type);
        setOpenAlert(!openAlert);
    };

    useEffect(() => {
        if (
            !responseOfErrands.loading &&
            responseOfErrands.success &&
            responseOfErrands.message !== ''
        ) {
            handleAlert(responseOfErrands.message, 'success');
        } else if (!responseOfErrands.success && responseOfErrands.message !== '') {
            handleAlert(responseOfErrands.message, 'error');
        }
    }, [responseOfErrands]);

    useEffect(() => {
        if (!getIdLocalStorage()) {
            navigate('/');
        }

        dispatch(getErrands(getIdLocalStorage()));
    }, [navigate, dispatch]);

    useEffect(() => {
        if (!openModal) {
            setIdErrand('');
        }
    }, [openModal]);

    const handleModalCreate = () => {
        setOpenModal(!openModal);
    };

    const handleModalUpdate = (id: string) => {
        setIdErrand(id);
        setOpenModal(!openModal);
    };

    const handleModalDelete = (id: string) => {
        setIdErrand(id);
        setOpenModalConfirm(!openModalConfirm);
    };

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
                            onClickEdit={() => handleModalUpdate(e.id)}
                            onClickDelet={() => handleModalDelete(e.id)}
                            onClickArchive={() => alert(`Arquivar ${e.id}`)}
                            isChecked={e.check}
                            onClickCheck={() => alert(`Check ${e.id}`)}
                        />
                    );
                })}

            <MyModal idErrand={idErrand} open={openModal} handleClose={handleModalCreate} />
            <MyModalConfirm
                idErrand={idErrand}
                open={openModalConfirm}
                handleClose={() => handleModalDelete('')}
            />
            <ButtonFloating onClick={handleModalCreate} />
            <Spinner />
            <MyAlert
                open={openAlert}
                handleClose={() => setOpenAlert(false)}
                type={typeAlert}
                info={infoAlert}
            />
        </Grid>
    );
}

export default ErrandsPage;
