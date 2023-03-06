import { ManageAccounts, Brightness4, Logout } from '@mui/icons-material';
import { alpha, Divider, Menu, MenuItem, MenuProps, styled } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={13}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        minWidth: 180,
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

interface MyMenuProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    handleClose: () => void;
}

function MyMenu({ anchorEl, open, handleClose }: MyMenuProps) {
    const navigate = useNavigate();

    const handleAccount = () => {
        navigate('/configuracoes');
        handleClose();
    };

    const handleLogout = () => {
        localStorage.setItem('idUserLogged', JSON.stringify(''));
        navigate('/');
    };

    return (
        <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            <MenuItem disableRipple onClick={handleAccount}>
                <ManageAccounts />
                Conta
            </MenuItem>
            <MenuItem disableRipple onClick={handleClose}>
                <Brightness4 />
                DarkMode
            </MenuItem>
            <Divider sx={{ m: 0.5 }} />
            <MenuItem disableRipple onClick={handleLogout}>
                <Logout />
                Sair
            </MenuItem>
        </StyledMenu>
    );
}

export default MyMenu;
