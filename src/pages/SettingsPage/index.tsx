import { Check } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import MyTextFieldPasswordSettings from '../../components/Settings/MyTextFieldPasswordSettings';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { User } from '../../store/modules/typeStore';
import { getUserById } from '../../store/modules/userLogged/userLoggedSlice';
import { attUser } from '../../store/modules/users/usersSlice';

function SettingsPage() {
    const userLogged = useAppSelector((state) => state.userLogged.data) as User;
    const usersLoading = useAppSelector((state) => state.users.loading);

    const [info, setInfo] = useState('');
    const [errorName, setErrorName] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorRePassword, setErrorRePassword] = useState(false);

    const [disabledName, setDisabledName] = useState(true);
    const [disabledPassword, setDisabledPassword] = useState(true);

    const [name, setName] = useState<string | undefined>('');
    const [email, setEmail] = useState<string | undefined>('');
    const [password, setPassword] = useState<string | undefined>('');
    const [rePassword, setRePassword] = useState<string | undefined>('');

    const dispatch = useAppDispatch();

    useEffect(() => {
        document.title = 'Configurações | RecadosApp';
    }, []);

    useEffect(() => {
        if (!usersLoading && userLogged) {
            dispatch(getUserById(userLogged.id));

            setDisabledName(true);
            setDisabledPassword(true);
        }
    }, [usersLoading]);

    useEffect(() => {
        if (userLogged) {
            setName(userLogged.name);
            setEmail(userLogged.email);
            setPassword(userLogged.password);
            setRePassword(userLogged.password);
        }
    }, [userLogged, disabledName, disabledPassword]);

    useEffect(() => {
        setErrorName(false);
        setErrorPassword(false);
        setErrorRePassword(false);
    }, [disabledName, disabledPassword]);

    const handleValidator = (value: string, type: string) => {
        switch (type) {
            case 'name':
                if (value.length < 3) {
                    setInfo('Nome deve conter no mínimo 3 caracteres.');
                    setErrorName(true);
                } else {
                    setInfo('');
                    setErrorName(false);
                }
                break;

            case 'password':
                const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

                if (!value.match(regexPassword)) {
                    setInfo('Senha deve conter no mínimo seis caracteres.');
                    setErrorPassword(true);
                } else {
                    setInfo('');
                    setErrorPassword(false);
                }
                break;

            case 'rePassword':
                if (!value || value !== password) {
                    setInfo('Senhas não condizem.');
                    setErrorRePassword(true);
                } else {
                    setInfo('');
                    setErrorRePassword(false);
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

    const handleDisabled = (type: string, value: boolean) => {
        switch (type) {
            case 'name':
                setDisabledName(value);
                break;

            case 'password':
                setDisabledPassword(value);
                break;

            default:
                break;
        }
    };

    const handleUpdate = () => {
        dispatch(attUser({ id: userLogged.id, name, password }));
    };

    return (
        <Grid item>
            <Grid item xs={12}>
                <Typography variant="h3">Configurações</Typography>
            </Grid>

            <Grid item display="flex" flexDirection="column" alignItems="center">
                <Grid item xs={12} sm={9} md={6} lg={4}>
                    <Grid item mb={3} mt={2}>
                        <Typography variant="h5" sx={{ fontStyle: 'italic' }}>
                            Minha conta
                        </Typography>
                    </Grid>
                    {/* --------------------------- NOME -------------------------------------- */}
                    <TextField
                        fullWidth
                        disabled={disabledName}
                        type="text"
                        label="Nome"
                        value={name}
                        onChange={(e) => handleChange(e.target.value, 'name')}
                        sx={{ padding: '2px 0' }}
                    />
                    {errorName && (
                        <Typography variant="caption" color="orange">
                            {info}
                        </Typography>
                    )}
                    <Grid item mb={2} display="flex" justifyContent="end" mt={0.5}>
                        {!disabledName && (
                            <Button
                                variant="text"
                                color="inherit"
                                sx={{ p: 1, mr: 1 }}
                                onClick={() => handleDisabled('name', true)}
                            >
                                Cancelar
                            </Button>
                        )}
                        <Button
                            variant={disabledName ? 'outlined' : 'contained'}
                            color={disabledName ? 'primary' : 'secondary'}
                            sx={{ p: 1 }}
                            onClick={
                                disabledName ? () => handleDisabled('name', false) : handleUpdate
                            }
                        >
                            {disabledName ? 'Editar' : 'Salvar'}
                            {!disabledName && <Check sx={{ ml: 0.2 }} />}
                        </Button>
                    </Grid>

                    {/* --------------------------- EMAIL -------------------------------------- */}
                    <TextField
                        fullWidth
                        disabled
                        type="email"
                        label="E-mail"
                        value={email}
                        sx={{ padding: '2px 0' }}
                    />

                    {/* --------------------------- SENHA -------------------------------------- */}
                    <MyTextFieldPasswordSettings
                        label="Senha"
                        disabled={disabledPassword}
                        value={password}
                        onChange={(e) => handleChange(e.target.value, 'password')}
                    />
                    {errorPassword && (
                        <Typography variant="caption" color="orange">
                            {info}
                        </Typography>
                    )}

                    <MyTextFieldPasswordSettings
                        label="Repetir senha"
                        disabled={disabledPassword}
                        value={rePassword}
                        onChange={(e) => handleChange(e.target.value, 'rePassword')}
                    />
                    {errorRePassword && (
                        <Typography variant="caption" color="orange">
                            {info}
                        </Typography>
                    )}
                    <Grid item mb={2} display="flex" justifyContent="end" mt={0.5}>
                        {!disabledPassword && (
                            <Button
                                variant="text"
                                color="inherit"
                                sx={{ p: 1, mr: 1 }}
                                onClick={() => handleDisabled('password', true)}
                            >
                                Cancelar
                            </Button>
                        )}
                        <Button
                            variant={disabledPassword ? 'outlined' : 'contained'}
                            color={disabledPassword ? 'primary' : 'secondary'}
                            sx={{ p: 1 }}
                            onClick={
                                disabledPassword
                                    ? () => handleDisabled('password', false)
                                    : handleUpdate
                            }
                        >
                            {disabledPassword ? 'Editar' : 'Salvar'}
                            {!disabledPassword && <Check sx={{ ml: 0.2 }} />}
                        </Button>
                    </Grid>
                    <Grid item mb={3} mt={2}>
                        <Typography variant="h5" color="#d32f2f" sx={{ fontStyle: 'italic' }}>
                            Zona de perigo
                        </Typography>
                        <Grid item display="flex" mt={4}>
                            <Typography variant="body1" sx={{ mr: 2 }}>
                                Depois de deletar essa conta, não há como voltar atrás. Por favor,
                                tenha certeza!
                            </Typography>
                            <Button variant="outlined" color="error" sx={{ width: 200 }}>
                                Deletar Conta
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default SettingsPage;
