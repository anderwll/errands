import { LockOpen, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';

interface MyTextFieldPasswordProps {
    label: string;
    value: string;
    onChange: (e: any) => void;
}

function MyTextFieldPassword({ label, value, onChange }: MyTextFieldPasswordProps) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <TextField
            fullWidth
            variant="standard"
            label={label}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <LockOpen sx={{ fontSize: 18 }} />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? (
                                <VisibilityOff sx={{ fontSize: 18 }} />
                            ) : (
                                <Visibility sx={{ fontSize: 18 }} />
                            )}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            sx={{ padding: '2px 0' }}
            value={value}
            onChange={onChange}
        />
    );
}

export default MyTextFieldPassword;
