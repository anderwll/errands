import { MailOutline } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { getUserById } from '../../../../store/modules/userLogged/userLoggedSlice';
import { getUsers, handleUsers } from '../../../../store/modules/users/usersSlice';
import MyAlert, { TypeAlert } from '../../../Alert';
import MyTextField from '../../MyTextField';
import MyTextFieldPassword from '../../MyTextFieldPassword';

function FormLogin() {
    const msgInfo = 'Use sua conta para acessar o sistema';
    const [info, setInfo] = useState(msgInfo);
    const [error, setError] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState<TypeAlert>('success');
    const [infoAlert, setInfoAlert] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dataOfUsers = useAppSelector(handleUsers);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const setIdLocalStorage = (id: string) => {
        localStorage.setItem('idUserLogged', JSON.stringify(id));
    };

    const handleAlert = (info: string, type: TypeAlert) => {
        setInfoAlert(info);
        setTypeAlert(type);
        setOpenAlert(!openAlert);
    };

    const clearInputs = () => {
        setEmail('');
        setPassword('');
    };

    useEffect(() => {
        dispatch(getUsers());
        setIdLocalStorage('');
    }, [dispatch, navigate]);

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
            return;
        }

        const exist = dataOfUsers.find(
            (user: any) => user.email === email && user.password === password,
        );

        if (!exist) {
            handleAlert('Email ou senha incorretos.', 'error');
            return;
        }

        handleAlert('Logando...', 'success');
        setIdLocalStorage(exist.id);
        dispatch(getUserById(exist.id));
        clearInputs();

        setTimeout(() => {
            navigate('/recados');
        }, 1000);
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
                    onClick={() => handleAlert('Não disponível no momento.', 'warning')}
                >
                    Esqueceu sua senha?
                </Button>
            </Grid>
            <Grid item>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{
                        p: 1.1,
                        borderRadius: 5,
                        background:
                            'linear-gradient(45deg, rgba(166,209,236,1) 0%, rgba(129,152,214,1) 32%, rgba(220,49,222,1) 100%)',
                    }}
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Grid>
            <MyAlert
                open={openAlert}
                handleClose={() => setOpenAlert(false)}
                type={typeAlert}
                info={infoAlert}
            />
        </Grid>
    );
}

export default FormLogin;
