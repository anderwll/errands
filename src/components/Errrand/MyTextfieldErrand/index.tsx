import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

interface MyTextFieldErrandProps {
    icon: any;
    label: string;
    type: React.HTMLInputTypeAttribute | undefined;
    value: string;
    onChange: (e: any) => void;
    multiline?: boolean;
    rows?: number;
}

function MyTextFieldErrand({
    icon,
    label,
    type,
    value,
    onChange,
    multiline,
    rows,
}: MyTextFieldErrandProps) {
    return (
        <TextField
            fullWidth
            variant="outlined"
            label={label}
            type={type}
            InputProps={{
                startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
            }}
            sx={{ padding: '2px 0', mb: '15px' }}
            value={value}
            onChange={onChange}
            multiline={multiline}
            rows={rows}
        />
    );
}

export default MyTextFieldErrand;
