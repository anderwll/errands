import { MailOutline, PersonOutlineOutlined } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';

import MyTextField from '../../MyTextField';
import MyTextFieldPassword from '../../MyTextFieldPassword';

function FormSignup() {
    const msgInfo = 'Use seu email para realizar o cadastro.';
    const [info, setInfo] = useState(msgInfo);
    const [error, setError] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const handleValidator = (value: string, type: string) => {
        switch (type) {
            case 'name':
                if (value.length < 3) {
                    setInfo('Nome deve conter no mínimo 3 caracteres.');
                    setError(true);
                } else {
                    setInfo(msgInfo);
                    setError(false);
                }
                break;

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
                    setInfo('Senha deve conter no mínimo seis caracteres, uma letra e um número.');
                    setError(true);
                } else {
                    setInfo(msgInfo);
                    setError(false);
                }
                break;

            case 'rePassword':
                if (!value || value !== password) {
                    setInfo('Senhas não condizem.');
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
            case 'name':
                setName(value);
                handleValidator(value, type);
                break;

            case 'email':
                setEmail(value);
                handleValidator(value, type);
                break;

            case 'password':
                setPassword(value);
                handleValidator(value, type);
                break;

            case 'rePassword':
                setRePassword(value);
                handleValidator(value, type);
                break;

            default:
                break;
        }
    };

    const handleSignup = () => {
        if (!name || !email || !password || !rePassword) {
            setInfo('Preencha todos os campos.');
            setError(true);
        }
    };

    return (
        <Grid item>
            <Grid item>
                <Typography variant="h4" color="inherit" sx={{ fontWeight: 'bold' }}>
                    Cadastro
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
                    icon={<PersonOutlineOutlined sx={{ fontSize: 18 }} />}
                    label="Nome"
                    type="text"
                    value={name}
                    onChange={(e) => handleChange(e.target.value, 'name')}
                />
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
                <MyTextFieldPassword
                    label="Repetir Senha"
                    value={rePassword}
                    onChange={(e) => handleChange(e.target.value, 'rePassword')}
                />
            </Grid>
            <Grid item>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ p: 1.1, borderRadius: 5 }}
                    onClick={handleSignup}
                >
                    Cadastrar
                </Button>
            </Grid>
        </Grid>
    );
}

export default FormSignup;
