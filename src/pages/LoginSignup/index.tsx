import { Facebook, Twitter, Google } from '@mui/icons-material';
import { Grid, Typography, Box, TextField, Button } from '@mui/material';
import React from 'react';

import MyPaper from '../../components/LoginSignup/MyPaper';

function LoginSignup() {
    return (
        <Grid
            container
            spacing={0}
            width="100vw"
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
        >
            <Grid item>
                <Typography variant="h5" color="initial">
                    Seja bem-vindo
                </Typography>
                <MyPaper elevation={12}>
                    <Box>
                        <Box>
                            <Typography variant="h3" color="initial">
                                Login
                            </Typography>
                            <Typography
                                variant="subtitle1"
                                color="initial"
                                sx={{ marginTop: '15px' }}
                            >
                                Use sua conta para acessar o sistema
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'end',
                                gap: '10px',
                                margin: '20px 0',
                            }}
                        >
                            <TextField fullWidth variant="standard" label="E-mail" type="email" />
                            <TextField fullWidth variant="standard" label="Senha" type="password" />
                            <Typography
                                variant="subtitle2"
                                color="initial"
                                sx={{ cursor: 'pointer' }}
                            >
                                Esqueceu sua senha?
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                sx={{ p: 1.2, borderRadius: 5 }}
                            >
                                Login
                            </Button>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="initial">
                            Ou cadastre-se usando
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '10px',
                                marginTop: '10px',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '45px',
                                    height: '45px',
                                    background: '#4267B2',
                                    borderRadius: 10,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#fff',
                                }}
                            >
                                <Facebook />
                            </Box>
                            <Box
                                sx={{
                                    width: '45px',
                                    height: '45px',
                                    background: '#1DA1F2',
                                    borderRadius: 10,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#fff',
                                }}
                            >
                                <Twitter />
                            </Box>
                            <Box
                                sx={{
                                    width: '45px',
                                    height: '45px',
                                    background: '#DB4437',
                                    borderRadius: 10,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#fff',
                                }}
                            >
                                <Google />
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="initial">
                            Ou cadastre-se usando
                        </Typography>
                        <Button variant="text" color="inherit">
                            Cadastro
                        </Button>
                    </Box>
                </MyPaper>
            </Grid>
        </Grid>
    );
}

export default LoginSignup;
