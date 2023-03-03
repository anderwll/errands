import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
    createEntityAdapter,
} from '@reduxjs/toolkit';

import { RootState } from '../..';
import { apiDelete, apiGet, apiPost, apiPut } from '../../../services/ApiService';
import {
    Errand,
    ResponseAPI,
    CreateNewErrandRequest,
    UpdateErrandRequest,
    DeleteErrandRequest,
    GetByIdErrandRequest,
} from '../typeStore';

const errandsAdapter = createEntityAdapter<Errand>({
    selectId: (state) => state.id,
});

export const { selectAll: handleErrands, selectById: handleErrandById } =
    errandsAdapter.getSelectors<RootState>((state) => state.errands);

export const getErrands = createAsyncThunk<ResponseAPI, string>(
    'errands/getErrands',
    async (idUser: string) => {
        const response = await apiGet(`/users/${idUser}/errands`);

        return response;
    },
);

export const getErrandById = createAsyncThunk<ResponseAPI, GetByIdErrandRequest>(
    'errands/getErrandById',
    async (params: GetByIdErrandRequest) => {
        const response = await apiGet(`/users/${params.idUser}/errands/${params.idErrand}`);

        return response;
    },
);

export const saveErrand = createAsyncThunk<ResponseAPI, CreateNewErrandRequest>(
    'errands/saveErrand',
    async (params: CreateNewErrandRequest) => {
        const response = await apiPost(
            `/users/${params.idUser}/errands`,
            params.dataCreateNewErrand,
        );

        return response;
    },
);

export const attErrand = createAsyncThunk<ResponseAPI, UpdateErrandRequest>(
    'errands/attErrand',
    async (params: UpdateErrandRequest) => {
        const response = await apiPut(
            `/users/${params.idUser}/errands/${params.idErrand}`,
            params.dataUpdateErrand,
        );

        return response;
    },
);

export const deleteErrand = createAsyncThunk<ResponseAPI, DeleteErrandRequest>(
    'errands/deleteErrand',
    async (params: DeleteErrandRequest) => {
        const response = await apiDelete(`/users/${params.idUser}/errands/${params.idErrand}`);

        return response;
    },
);

const errandsSlice = createSlice({
    name: 'errands',
    initialState: errandsAdapter.getInitialState({
        success: false,
        message: '',
        loading: false,
    }),
    reducers: {},
    extraReducers: (builder) => {
        // GET ERRANDS
        builder.addCase(getErrands.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getErrands.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
            if (action.payload.success) {
                errandsAdapter.setAll(state, action.payload.data);
            }

            state.loading = false;
            state.success = action.payload.success;
            state.message = action.payload.message;
        });

        // GET ERRAND BY ID
        builder.addCase(getErrandById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getErrandById.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
            if (action.payload.success) {
                errandsAdapter.setOne(state, action.payload.data);
            }

            state.loading = false;
            state.success = action.payload.success;
            state.message = action.payload.message;
        });

        // POST ERRAND
        builder.addCase(saveErrand.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(saveErrand.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
            if (action.payload.success) {
                errandsAdapter.addOne(state, action.payload.data);
            }

            state.loading = false;
            state.success = action.payload.success;
            state.message = action.payload.message;
        });

        // PUT ERRAND
        builder.addCase(attErrand.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(attErrand.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
            if (action.payload.success) {
                errandsAdapter.updateOne(state, action.payload.data);
            }

            state.loading = false;
            state.success = action.payload.success;
            state.message = action.payload.message;
        });

        // DELETE ERRAND
        builder.addCase(deleteErrand.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteErrand.fulfilled, (state, action: PayloadAction<ResponseAPI>) => {
            if (action.payload.success) {
                errandsAdapter.removeOne(state, action.payload.data);
            }

            state.loading = false;
            state.success = action.payload.success;
            state.message = action.payload.message;
        });
    },
});

export const errandsReducer = errandsSlice.reducer;
