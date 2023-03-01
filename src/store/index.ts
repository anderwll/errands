import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './modules/rootReducer';

const myStore = configureStore({
    reducer: rootReducer,
});

export { myStore };

export type RootState = ReturnType<typeof myStore.getState>;

export type AppDispatch = typeof myStore.dispatch;
