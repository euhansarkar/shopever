import { ISelectSlice, IVarientOptionCore } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState: ISelectSlice = {}

const selectSlice = createSlice({
    name: 'select',
    initialState,
    reducers: {
        selectVarientOption: (state, action: PayloadAction<{ attributeName: string; selectedOption: IVarientOptionCore }>) => {
            const { attributeName, selectedOption } = action.payload;
            state[attributeName] = selectedOption;
        },
        resetVarientOption: (state) => {
            // Reset each key to its initial value
            Object.keys(state).forEach((key) => {
                delete state[key];
            });
        },
    },
});

export const { selectVarientOption, resetVarientOption } = selectSlice.actions;

export default selectSlice.reducer