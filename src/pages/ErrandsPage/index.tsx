import { Archive, KeyboardBackspace } from '@mui/icons-material';
import { Typography, Grid, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MyAlert, { TypeAlert } from '../../components/Alert';
import ButtonFloating from '../../components/Errrand/ButtonFloating';
import MyCard from '../../components/Errrand/Card';
import MyModal from '../../components/Errrand/MyModal';
import MyModalConfirm from '../../components/Errrand/MyModalConfirm';
import Spinner from '../../components/Spinner';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { attErrand, getErrands, handleErrands } from '../../store/modules/errands/errandsSlice';

function ErrandsPage() {
    const [openModal, setOpenModal] = useState(false);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [idErrand, setIdErrand] = useState('');

    const [openAlert, setOpenAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState<TypeAlert>('success');
    const [infoAlert, setInfoAlert] = useState('');

    const [archive, setArchive] = useState(false);

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

    // POPULA MEU ESTADO GLOBAL.
    useEffect(() => {
        if (!getIdLocalStorage()) {
            navigate('/');
        }

        dispatch(getErrands(getIdLocalStorage()));
    }, [navigate, dispatch]);

    // MONTA MEU ALERTA, DE ACORDO COM A RESPOSTA DA API.
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

    // GARANTE QUE MEU ID DO RECADO SERA SEMPRE VAZIO.
    useEffect(() => {
        if (!openModal) {
            setIdErrand('');
        }
    }, [openModal]);

    const handleModal = () => {
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

    const handleArchive = (id: string, filed: boolean) => {
        dispatch(
            attErrand({
                idUser: getIdLocalStorage(),
                id,
                dataUpdateErrand: { filed: !filed },
            }),
        );
    };

    const handleCheck = (id: string, check: boolean) => {
        dispatch(
            attErrand({
                idUser: getIdLocalStorage(),
                id,
                dataUpdateErrand: { check: !check },
            }),
        );
    };

    const showArchiveAndUnarchive = () => {
        setArchive(!archive);
    };

    return (
        <Grid container spacing={2} width="calc(100vw - 80px)" display="flex">
            <Grid item xs={12}>
                <Typography variant="h4" color="initial">
                    Meus recados {archive && 'arquivados'}
                </Typography>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                    variant="text"
                    color="inherit"
                    onClick={showArchiveAndUnarchive}
                    disableRipple
                >
                    {archive ? (
                        <KeyboardBackspace sx={{ fontSize: 18, mr: 0.5 }} />
                    ) : (
                        <Archive sx={{ fontSize: 18, mr: 0.5 }} />
                    )}
                    {archive
                        ? 'Voltar'
                        : `(${dataOfErrands.filter((e) => e.filed === true).length}) Arquivados`}
                </Button>
            </Grid>

            {dataOfErrands.length === 0 && (
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="body1" color="#707070" sx={{ fontStyle: 'italic' }}>
                        Você ainda não possui recados...
                    </Typography>
                </Grid>
            )}

            {dataOfErrands.filter((e) => e.filed === true).length === 0 && archive && (
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="body1" color="#707070" sx={{ fontStyle: 'italic' }}>
                        Você não possui recados arquivados...
                    </Typography>
                </Grid>
            )}

            {dataOfErrands &&
                dataOfErrands.map((e) => {
                    if (e.filed === archive) {
                        return (
                            <MyCard
                                key={e.id}
                                title={e.title}
                                description={e.description}
                                date={e.date}
                                onClickEdit={() => handleModalUpdate(e.id)}
                                onClickDelet={() => handleModalDelete(e.id)}
                                modeArchive={archive}
                                onClickArchive={() => handleArchive(e.id, e.filed)}
                                isChecked={e.check}
                                onClickCheck={() => handleCheck(e.id, e.check)}
                            />
                        );
                    }
                    return true;
                })}

            <MyModal idErrand={idErrand} open={openModal} handleClose={handleModal} />
            <MyModalConfirm
                idErrand={idErrand}
                open={openModalConfirm}
                handleClose={() => handleModalDelete('')}
            />
            <ButtonFloating onClick={handleModal} />
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
