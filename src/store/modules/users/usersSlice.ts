import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    createEntityAdapter,
} from '@reduxjs/toolkit';

import { RootState } from '../..';
import { apiDelete, apiGet, apiPost, apiPut } from '../../../services/ApiService';
import { CreateNewUserRequest, ResponseAPI, UpdateUserRequest, User } from '../typeStore';

const usersAdapter = createEntityAdapter<User>({
    selectId: (state) => state.id,
});

export const { selectAll: handleUsers, selectById: handleUserById } =
    usersAdapter.getSelectors<RootState>((state) => state.users);

// BUSCA TODOS USUÁRIOS
export const getUsers = createAsyncThunk<ResponseAPI>('users/getUsers', async () => {
    const response = await apiGet('/users');

    return response;
});

export const saveUser = createAsyncThunk<ResponseAPI, CreateNewUserRequest>(
    'users/saveUser',
    async (dataNewUser: CreateNewUserRequest) => {
        const response = await apiPost('/users', dataNewUser);

        return response;
    },
);

export const attUser = createAsyncThunk<ResponseAPI, UpdateUserRequest>(
    'users/attUser',
    async (dataAttUser: UpdateUserRequest) => {
        const response = await apiPut(`/users/${dataAttUser.id}`, dataAttUser);

        return response;
    },
);

export const deleteUser = createAsyncThunk('users/deleteUser', async (id: string) => {
    const response = await apiDelete(`/users/${id}`);

    return response;
});

const usersSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState({
        success: false,
        message: '',
        loading: false,
    }),
    reducers: {},
    extraReducers: (builder) => {
        // GET USERS
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
            if (action.payload.success) {
                usersAdapter.addMany(state, action.payload.data);
            }

            state.loading = false;
            state.success = action.payload.success;
            state.message = action.payload.message;
        });

        // POST USERS
        builder.addCase(saveUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(saveUser.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
            if (action.payload.success) {
                usersAdapter.addOne(state, action.payload.data);
            }
            state.loading = false;
            state.success = action.payload.success;
            state.message = action.payload.message;
        });

        // PUT USERS
        builder.addCase(attUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(attUser.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
            if (action.payload.success) {
                usersAdapter.updateOne(state, action.payload.data);
            }
            state.loading = false;
            state.success = action.payload.success;
            state.message = action.payload.message;
        });

        // DELETE USERS
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
            if (action.payload.success) {
                usersAdapter.removeOne(state, action.payload.data);
            }
            state.loading = false;
            state.success = action.payload.success;
            state.message = action.payload.message;
        });
    },
});

export const usersReducer = usersSlice.reducer;
