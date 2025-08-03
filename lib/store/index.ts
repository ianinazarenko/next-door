import { configureStore } from '@reduxjs/toolkit';
import complexReducer from './slices/complexSlice';

export const store = configureStore({
    reducer: {
        complex: complexReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
