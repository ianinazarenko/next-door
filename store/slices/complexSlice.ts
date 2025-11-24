import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// This might be used after MVP release
export interface IComplexState {
    selectedComplex: string | null;
}

const initialState: IComplexState = {
    selectedComplex: null,
};

const complexSlice = createSlice({
    name: 'complexes',
    initialState,
    reducers: {
        setSelectedComplex: (state, action: PayloadAction<string>) => {
            state.selectedComplex = action.payload;
        },
        clearSelectedComplex: (state) => {
            state.selectedComplex = null;
        },
    },
});

export const { setSelectedComplex, clearSelectedComplex } = complexSlice.actions;
export default complexSlice.reducer;
