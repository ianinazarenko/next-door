import { configureStore } from '@reduxjs/toolkit';

import complexReducer from './slices/complexSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        complex: complexReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
