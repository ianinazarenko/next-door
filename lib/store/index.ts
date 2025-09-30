import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import complexReducer from './slices/complexSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        complex: complexReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
