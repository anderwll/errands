import { Delete } from '@mui/icons-material';
import { Modal, Typography, Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { User } from '../../../store/modules/typeStore';
import { deleteUser } from '../../../store/modules/users/usersSlice';
import MyTextFieldPasswordSettings from '../MyTextFieldPasswordSettings';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 385,
    height: 370,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
};

interface MyModalConfirmProps {
    open: boolean;
    handleClose: () => void;
}

function MyModalConfirm({ open, handleClose }: MyModalConfirmProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [info, setInfo] = useState('');
    const [password, setPassword] = useState('');

    const userLogged = useAppSelector((state) => state.userLogged.data) as User;

    useEffect(() => {
        setInfo('');
        setPassword('');
    }, [open]);

    const handleChange = (value: string) => {
        setPassword(value);
    };

    const handleDelete = () => {
        if (!password) {
            setInfo('Necessário digitar sua senha.');
            return;
        }

        if (password !== userLogged.password) {
            setInfo('Senha inválida.');
            return;
        }

        dispatch(deleteUser(userLogged.id));
        setTimeout(() => {
            navigate('/');
        }, 2000);
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
                    <Typography variant="h4">Deletar Conta</Typography>
                    <Typography variant="subtitle1" sx={{ marginTop: '20px' }}>
                        Atenção!! Tem certeza que deseja deletar essa conta? Para confirmar digite
                        sua senha.
                    </Typography>

                    <MyTextFieldPasswordSettings
                        label="Digite sua senha"
                        value={password}
                        onChange={(e) => handleChange(e.target.value)}
                    />

                    <Typography variant="caption" color="orange">
                        {info}
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
                        color="error"
                        sx={{ p: '9px 15px' }}
                        onClick={handleDelete}
                    >
                        Deletar conta
                        <Delete sx={{ ml: 1 }} />
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default MyModalConfirm;
