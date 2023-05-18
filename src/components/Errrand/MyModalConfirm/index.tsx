import { Check } from '@mui/icons-material';
import { Modal, Typography, Box, Button } from '@mui/material';
import React from 'react';

import { useAppDispatch } from '../../../store/hooks';
import { deleteErrand } from '../../../store/modules/errands/errandsSlice';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 385,
    height: 320,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

interface MyModalConfirmProps {
    idErrand: string;
    open: boolean;
    handleClose: () => void;
}

function MyModalConfirm({ idErrand, open, handleClose }: MyModalConfirmProps) {
    const dispatch = useAppDispatch();

    const getIdLocalStorage = () => {
        return JSON.parse(localStorage.getItem('idUserLogged') || '');
    };

    const handleDelete = () => {
        dispatch(deleteErrand({ idUser: getIdLocalStorage(), id: idErrand }));
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
                    <Typography variant="h4">Apagar Recado</Typography>
                    <Typography variant="subtitle1" sx={{ marginTop: '20px' }}>
                        Tem certeza que deseja excluir esse recado?
                    </Typography>
                    <Typography variant="subtitle1" sx={{ marginTop: '20px' }}>
                        Ao confirmar, não podera mais ser desfeito.
                    </Typography>
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
                    <Button variant="text" color="inherit" sx={{ p: 1.2 }} onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ p: '9px 15px' }}
                        onClick={handleDelete}
                    >
                        Sim
                        <Check sx={{ ml: 1 }} />
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default MyModalConfirm;
