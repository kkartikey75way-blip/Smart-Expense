import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SortDirection = 'asc' | 'desc' | null;

interface SortConfig {
    key: string;
    direction: SortDirection;
}

interface UIState {
    searchTerm: string;
    sortConfig: SortConfig;
}

const initialState: UIState = {
    searchTerm: '',
    sortConfig: {
        key: 'date',
        direction: 'desc',
    },
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setSortConfig: (state, action: PayloadAction<SortConfig>) => {
            state.sortConfig = action.payload;
        },
        resetUI: (state) => {
            state.searchTerm = '';
            state.sortConfig = initialState.sortConfig;
        },
    },
});

export const { setSearchTerm, setSortConfig, resetUI } = uiSlice.actions;
export default uiSlice.reducer;
