import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { apiGet } from '../../../services/ApiService';
import { ResponseAPI, InitialStateUserLogged } from '../typeStore';

const initialState: InitialStateUserLogged = {
    loading: false,
    success: false,
    message: '',
    data: null,
};

export const getUserById = createAsyncThunk<ResponseAPI, string>(
    'users/getUsersById',
    async (id: string) => {
        const response = await apiGet(`/users/${id}`);

        return response;
    },
);

const userLoggedSlice = createSlice({
    name: 'userLogged',
    initialState,
    reducers: {
        clearUserLogged() {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        // GET USER BY ID
        builder.addCase(getUserById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserById.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
            state.loading = false;
            state.success = action.payload.success;
            state.message = action.payload.message;
            state.data = action.payload.data;
        });
    },
});

export const userLoggedReducer = userLoggedSlice.reducer;
export const { clearUserLogged } = userLoggedSlice.actions;
