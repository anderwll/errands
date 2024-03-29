import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';

interface MyTextFieldPasswordSettingsProps {
    label: string;
    isColorError?: boolean;
    value: string | undefined;
    disabled?: boolean;
    onChange: (e: any) => void;
}

function MyTextFieldPasswordSettings({
    label,
    isColorError,
    value,
    disabled,
    onChange,
}: MyTextFieldPasswordSettingsProps) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <TextField
            fullWidth
            disabled={disabled}
            color={isColorError ? 'error' : 'primary'}
            variant="outlined"
            label={label}
            type={showPassword && !disabled ? 'text' : 'password'}
            InputProps={{
                endAdornment: !disabled && (
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
            sx={{ padding: '2px 0', mt: 2 }}
            value={value}
            onChange={onChange}
        />
    );
}

export default MyTextFieldPasswordSettings;
