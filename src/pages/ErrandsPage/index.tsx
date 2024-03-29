import { Search, Close } from '@mui/icons-material';
import { Typography, Grid, Button, ButtonGroup, InputAdornment, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import MyAlert, { TypeAlert } from '../../components/Alert';
import ButtonFloating from '../../components/Errrand/ButtonFloating';
import MyCard from '../../components/Errrand/Card';
import MyModal from '../../components/Errrand/MyModal';
import MyModalConfirm from '../../components/Errrand/MyModalConfirm';
import Spinner from '../../components/Spinner';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { attErrand, getErrands, handleErrands } from '../../store/modules/errands/errandsSlice';
import { User } from '../../store/modules/typeStore';

function ErrandsPage() {
    const [openModal, setOpenModal] = useState(false);
    const [openModalConfirm, setOpenModalConfirm] = useState(false);
    const [idErrand, setIdErrand] = useState('');

    const [openAlert, setOpenAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState<TypeAlert>('success');
    const [infoAlert, setInfoAlert] = useState('');

    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState('');
    const [activeSearch, setActiveSearch] = useState(false);

    const userLogged = useAppSelector((state) => state.userLogged.data) as User;
    const responseOfErrands = useAppSelector((state) => state.errands);
    const dataOfErrands = useAppSelector(handleErrands);

    const dispatch = useAppDispatch();

    const handleAlert = (info: string, type: TypeAlert) => {
        setInfoAlert(info);
        setTypeAlert(type);
        setOpenAlert(!openAlert);
    };

    useEffect(() => {
        document.title = 'Meus Recados | RecadosApp';
    }, []);

    // --- OBSERVA QUANDO PESQUISAR E RECARREGA PAG --- //
    useEffect(() => {
        if (!activeSearch && userLogged) {
            dispatch(getErrands({ idUser: userLogged.id, filters: { filed: false } }));
        }
    }, [activeSearch, userLogged]);

    // --- OBSERVA QUANDO ATT RECADO --- //
    useEffect(() => {
        if (responseOfErrands.message === 'Recado atualizado com sucesso.') {
            dispatch(getErrands({ idUser: userLogged.id, filters: { filed: false } }));
        }
    }, [responseOfErrands]);

    // --- OBSERVA QUANDO A PARTE DE ALERTA --- //
    useEffect(() => {
        if (
            !responseOfErrands.loading &&
            responseOfErrands.success &&
            responseOfErrands.message !== '' &&
            responseOfErrands.message !== 'Recados buscado com sucesso.'
        ) {
            handleAlert(responseOfErrands.message, 'success');
        } else if (
            !responseOfErrands.success &&
            responseOfErrands.message !== '' &&
            responseOfErrands.message !== 'Recados buscado com sucesso.'
        ) {
            handleAlert(responseOfErrands.message, 'error');
        }
    }, [responseOfErrands]);

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
                idUser: userLogged.id,
                id,
                dataUpdateErrand: { filed: !filed },
            }),
        );
    };

    const handleCheck = (id: string, check: boolean) => {
        dispatch(
            attErrand({
                idUser: userLogged.id,
                id,
                dataUpdateErrand: { check: !check },
            }),
        );
    };

    const handleSearch = () => {
        if (!search) {
            handleAlert('Necessário o título a ser pesquisado.', 'warning');
            return;
        }

        dispatch(getErrands({ idUser: userLogged.id, filters: { title: search, filed: false } }));
        setActiveSearch(true);
        setSearchResult(search);
    };

    const handleCloseSearch = () => {
        setActiveSearch(false);
        setSearch('');
        setSearchResult('');
    };

    return (
        <Grid container spacing={2} width="calc(100vw - 80px)" display="flex">
            <Grid item xs={12}>
                <Typography variant="h3">Meus recados</Typography>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
                <ButtonGroup disableElevation variant="contained" sx={{ gap: 1, width: '384px' }}>
                    <TextField
                        fullWidth
                        color="primary"
                        variant="outlined"
                        placeholder="Pesquise pelo título..."
                        type="text"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment
                                    position="end"
                                    sx={{ mr: 1, cursor: 'pointer' }}
                                    onClick={handleSearch}
                                >
                                    <Search sx={{ mr: 1 }} />
                                </InputAdornment>
                            ),
                        }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ p: '15px 5px' }}
                    />
                </ButtonGroup>
            </Grid>

            {activeSearch && (
                <Grid item xs={12} display="flex" justifyContent="space-between">
                    <Typography variant="h6">Resultado(s) para: ` {searchResult} `</Typography>
                    <Button variant="text" color="inherit" onClick={handleCloseSearch}>
                        <Close sx={{ fontSize: 25 }} />
                    </Button>
                </Grid>
            )}

            {dataOfErrands.length === 0 && activeSearch && (
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="body1" color="#707070" sx={{ fontStyle: 'italic' }}>
                        Nenhum recado encontrado...
                    </Typography>
                </Grid>
            )}

            {dataOfErrands.filter((e) => e.filed === false).length === 0 && !activeSearch && (
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="body1" color="#707070" sx={{ fontStyle: 'italic' }}>
                        Você ainda não possui recados...
                    </Typography>
                </Grid>
            )}

            {dataOfErrands &&
                dataOfErrands.map((e) => {
                    if (e.filed === false) {
                        return (
                            <MyCard
                                key={e.id}
                                title={e.title}
                                description={e.description}
                                date={e.date}
                                onClickEdit={() => handleModalUpdate(e.id)}
                                onClickDelet={() => handleModalDelete(e.id)}
                                modeArchive={false}
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
