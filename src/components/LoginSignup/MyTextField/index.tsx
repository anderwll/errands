import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

interface MyTextFieldProps {
    icon: any;
    label: string;
    type: React.HTMLInputTypeAttribute | undefined;
    value: string;
    onChange: (e: any) => void;
}

function MyTextField({ icon, label, type, value, onChange }: MyTextFieldProps) {
    return (
        <TextField
            fullWidth
            variant="standard"
            label={label}
            type={type}
            InputProps={{
                startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
            }}
            sx={{ padding: '2px 0' }}
            value={value}
            onChange={onChange}
        />
    );
}

export default MyTextField;
