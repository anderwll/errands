import {
    AccountCircle,
    Menu,
    Dashboard,
    Description,
    Settings,
    Archive,
} from '@mui/icons-material';
import {
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
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    {
        text: 'Dashboard',
        path: '/dashboard',
        icon: <Dashboard />,
    },
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
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Grid container display="flex" flexDirection="column" width="100vw">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ background: '#3a3a3a' }}>
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
                        <IconButton size="large" edge="end" color="inherit" aria-label="menu">
                            <AccountCircle sx={{ fontSize: 32 }} />
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
            <Grid item sx={{ m: '60px 0 0 60px', p: 2 }} onClick={() => setOpen(false)}>
                {component}
            </Grid>
        </Grid>
    );
}

export default LayoutDefault;
