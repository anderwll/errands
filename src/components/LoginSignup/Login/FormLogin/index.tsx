import { MailOutline } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

import MyAlert from '../../../Alert';
import MyTextField from '../../MyTextField';
import MyTextFieldPassword from '../../MyTextFieldPassword';

function FormLogin() {
    const msgInfo = 'Use sua conta para acessar o sistema';
    const [info, setInfo] = useState(msgInfo);
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleValidator = (value: string, type: string) => {
        switch (type) {
            case 'email':
                const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                if (!value.match(regexEmail)) {
                    setInfo('Utilize um email válido.');
                    setError(true);
                } else {
                    setInfo(msgInfo);
                    setError(false);
                }

                break;

            case 'password':
                const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

                if (!value.match(regexPassword)) {
                    setInfo('Utilize uma senha válida.');
                    setError(true);
                } else {
                    setInfo(msgInfo);
                    setError(false);
                }
                break;

            default:
                break;
        }
    };

    const handleChange = (value: string, type: string) => {
        switch (type) {
            case 'email':
                setEmail(value);
                handleValidator(value, type);
                break;

            case 'password':
                setPassword(value);
                handleValidator(value, type);
                break;

            default:
                break;
        }
    };

    const handleLogin = () => {
        if (!email || !password) {
            setInfo('Preencha todos os campos.');
            setError(true);
        }
    };

    const handleAlert = () => {
        if (!open) {
            setOpen(true);

            setTimeout(() => {
                setOpen(false);
            }, 2000);
        }
    };

    return (
        <Grid item>
            <Grid item>
                <Typography variant="h4" color="inherit" sx={{ fontWeight: 'bold' }}>
                    Login
                </Typography>
                <Typography
                    variant="subtitle2"
                    color={error ? 'orange' : 'inherit'}
                    sx={{ marginTop: '15px' }}
                >
                    {info}
                </Typography>
            </Grid>
            <Grid
                item
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
                    gap: '10px',
                    margin: '20px 0',
                }}
            >
                <MyTextField
                    icon={<MailOutline sx={{ fontSize: 18 }} />}
                    label="E-mail"
                    type="email"
                    value={email}
                    onChange={(e) => handleChange(e.target.value, 'email')}
                />
                <MyTextFieldPassword
                    label="Senha"
                    value={password}
                    onChange={(e) => handleChange(e.target.value, 'password')}
                />
                <Button
                    variant="text"
                    color="inherit"
                    sx={{ p: 0.2, textTransform: 'capitalize', fontSize: 12 }}
                    onClick={handleAlert}
                >
                    Esqueceu sua senha?
                </Button>
            </Grid>
            <Grid item>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ p: 1.1, borderRadius: 5 }}
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Grid>
            <MyAlert open={open} type="error" info="Não disponível no momento." />
        </Grid>
    );
}

export default FormLogin;
