import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// This might be used after MVP release
export interface IUserState {
    id: string;
    name: string;
    email: string | null;
}

const initialState: IUserState = {
    id: 'c9x7q0k8f0000l3b1a9m2p6s',
    name: 'Random User',
    email: 'random.user@mail.com',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<IUserState>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
