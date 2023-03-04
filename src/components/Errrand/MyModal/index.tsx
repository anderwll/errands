import { Description, Title, Check, Close } from '@mui/icons-material';
import { Modal, Typography, Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
    attErrand,
    handleErrandById,
    saveErrand,
} from '../../../store/modules/errands/errandsSlice';
import { Errand } from '../../../store/modules/typeStore';
import MyTextFieldErrand from '../MyTextfieldErrand';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 385,
    height: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

interface MyModalProps {
    idErrand: string;
    open: boolean;
    handleClose: () => void;
}

function MyModal({ idErrand, open, handleClose }: MyModalProps) {
    const [id, setId] = useState<string>('');
    const msgInfo = 'Crie um novo recado...';
    const msgInfoAtt = 'Atualize seu recado...';
    const [info, setInfo] = useState(msgInfo);
    const [error, setError] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useAppDispatch();
    const errand = useAppSelector((state) => handleErrandById(state, id)) as Errand;

    const getIdLocalStorage = () => {
        return JSON.parse(localStorage.getItem('idUserLogged') || '');
    };

    useEffect(() => {
        if (idErrand) {
            setId(idErrand);
            setInfo(msgInfoAtt);
        } else {
            setId('');
            setInfo(msgInfo);
        }
    }, [idErrand]);

    useEffect(() => {
        if (errand) {
            setTitle(errand.title);
            setDescription(errand.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [errand]);

    const clearInputs = () => {
        setTitle('');
        setDescription('');
    };

    const handleValidator = (value: string) => {
        if (!value) {
            setInfo('Preencha todos os campos.');
            setError(true);
            return;
        }
        if (value.length < 3) {
            setInfo('No mínimo 3 caracteres.');
            setError(true);
            return;
        }
        setInfo(!id ? msgInfo : msgInfoAtt);
        setError(false);
    };

    const handleChange = (value: string, type: string) => {
        switch (type) {
            case 'title':
                setTitle(value);
                handleValidator(value);
                break;

            case 'description':
                setDescription(value);
                handleValidator(value);
                break;

            default:
                break;
        }
    };

    const handleCreate = () => {
        if (!title || !description) {
            handleValidator('');
            return;
        }

        dispatch(
            saveErrand({
                idUser: getIdLocalStorage(),
                dataCreateNewErrand: { title, description },
            }),
        );
        clearInputs();
        handleClose();
    };

    const handleUpdate = () => {
        if (!title || !description) {
            handleValidator('');
            return;
        }

        dispatch(
            attErrand({
                idUser: getIdLocalStorage(),
                id,
                dataUpdateErrand: {
                    title,
                    description,
                },
            }),
        );

        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h4">{!id ? 'Novo Recado' : 'Editar Recado'}</Typography>
                    <Typography
                        variant="subtitle2"
                        color={error ? 'orange' : 'inherit'}
                        sx={{ marginTop: '15px' }}
                    >
                        {info}
                    </Typography>
                </Box>
                <Box>
                    <MyTextFieldErrand
                        icon={<Title sx={{ fontSize: 18 }} />}
                        type="text"
                        label="Titulo"
                        value={title}
                        onChange={(e) => handleChange(e.target.value, 'title')}
                    />
                    <MyTextFieldErrand
                        icon={<Description sx={{ fontSize: 18 }} />}
                        type="text"
                        label="Descrição"
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => handleChange(e.target.value, 'description')}
                    />
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'end',
                        justifyContent: 'end',
                        gap: 1,
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ p: 1.2 }}
                        onClick={!id ? handleCreate : handleUpdate}
                    >
                        <Check sx={{ mr: 1 }} />
                        Salvar
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ p: 1.2 }}
                        onClick={handleClose}
                    >
                        <Close />
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default MyModal;
