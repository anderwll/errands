import { Box, CircularProgress } from '@mui/material';
import React from 'react';

import { useAppSelector } from '../../store/hooks';

function Spinner() {
    const loadingOfUsers = useAppSelector((state) => state.users.loading);
    const loadingOfUserLogged = useAppSelector((state) => state.userLogged.loading);
    const loadingOfErrands = useAppSelector((state) => state.errands.loading);

    return (
        <>
            {(loadingOfUsers || loadingOfUserLogged || loadingOfErrands) && (
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100vw',
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress color="secondary" />
                </Box>
            )}
        </>
    );
}

export default Spinner;
