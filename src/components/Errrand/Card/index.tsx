import { MoreVert, GradeOutlined, Grade } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    Grid,
    Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';

import OptionsErrand from '../OptionsErrand';

interface MyCardProps {
    title: string;
    description: string;
    date: string;
    onClickEdit: () => void;
    onClickDelet: () => void;
    onClickArchive: () => void;
    isChecked: boolean;
    onClickCheck: () => void;
}

function MyCard({
    title,
    description,
    date,
    onClickDelet,
    onClickEdit,
    onClickArchive,
    onClickCheck,
    isChecked,
}: MyCardProps) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        handleClose();
    }, [onClickDelet, onClickEdit, onClickArchive]);

    return (
        <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
            <Card
                sx={{
                    minHeight: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1,
                    background: '#fff',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'end',
                        justifyContent: 'end',
                        position: 'absolute',
                    }}
                >
                    <Button variant="text" color="inherit" onClick={handleClick}>
                        <MoreVert />
                    </Button>
                </Box>
                <CardContent sx={{ height: 240, overflowY: 'auto' }}>
                    <Typography sx={{ fontSize: 20 }} color="inherit" gutterBottom>
                        {title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="inherit">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Checkbox
                        icon={<GradeOutlined />}
                        checkedIcon={<Grade />}
                        sx={{ p: 0 }}
                        color="secondary"
                        onClick={onClickCheck}
                        checked={isChecked}
                    />
                    <Typography variant="caption" color="inherit">
                        {date}
                    </Typography>
                </CardActions>
            </Card>
            <OptionsErrand
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                handleEdit={onClickEdit}
                handleDelete={onClickDelet}
                handleArchive={onClickArchive}
            />
        </Grid>
    );
}

export default MyCard;
