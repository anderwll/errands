import { AccountCircle, Menu, Description, Settings, Archive } from '@mui/icons-material';
import {
    Avatar,
    Box,
    CSSObject,
    Divider,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
    Theme,
    Toolbar,
    useTheme,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MyMenu from '../../components/LayoutDefault/MyMenu';
import { useAppSelector } from '../../store/hooks';

interface LayoutDefaultProps {
    component: JSX.Element;
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const MyDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const listItem = [
    // {
    //     text: 'Dashboard',
    //     path: '/dashboard',
    //     icon: <Dashboard />,
    // },
    {
        text: 'Meus Recados',
        path: '/recados',
        icon: <Description />,
    },
    {
        text: 'Arquivados',
        path: '/arquivados',
        icon: <Archive />,
    },
    {
        text: 'Configurações',
        path: '/configuracoes',
        icon: <Settings />,
    },
];

function LayoutDefault({ component }: LayoutDefaultProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const [open, setOpen] = useState(false);
    const name = useAppSelector((state) => state.userLogged.data?.name);
    const navigate = useNavigate();
    const theme = useTheme();

    const getIdLocalStorage = () => {
        return JSON.parse(localStorage.getItem('idUserLogged') || '');
    };

    useEffect(() => {
        if (!getIdLocalStorage()) {
            navigate('/');
        }
    }, [navigate]);

    const handleDrawer = () => {
        setOpen(!open);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid container display="flex" flexDirection="column" width="100vw">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ background: '#535353' }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 5 }}
                            onClick={handleDrawer}
                        >
                            <Menu />
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleClick}
                        >
                            {!name ? (
                                <AccountCircle sx={{ fontSize: 32 }} />
                            ) : (
                                <Avatar>{name && `${name[0]}${name[1]}`}</Avatar>
                            )}
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <MyDrawer variant="permanent" open={open}>
                    <List sx={{ marginTop: '65px' }}>
                        {listItem.map((item) => (
                            <ListItem
                                key={item.text}
                                disablePadding
                                sx={{ display: 'block' }}
                                onClick={() => navigate(item.path)}
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.text}
                                        sx={{
                                            opacity: open ? 1 : 0,
                                            color: '#707070',
                                        }}
                                    />
                                </ListItemButton>
                                <Divider />
                            </ListItem>
                        ))}
                    </List>
                </MyDrawer>
            </Box>
            <Grid
                item
                sx={{
                    height: '100%',
                    m: '60px 0 0 55px',
                    p: 3,
                    background: theme.palette.background.default,
                }}
                onClick={() => setOpen(false)}
            >
                <Grid
                    item
                    sx={{
                        height: 'calc(100vh - 60px)',
                        background: theme.palette.background.default,
                    }}
                >
                    {component}
                </Grid>
            </Grid>

            <MyMenu open={openMenu} anchorEl={anchorEl} handleClose={handleClose} />
        </Grid>
    );
}

export default LayoutDefault;
