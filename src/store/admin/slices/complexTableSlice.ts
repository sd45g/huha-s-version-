import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ComplexTableState {
  searchText: string;
}

const initialState: ComplexTableState = {
  searchText: '',
};

const complexTableSlice = createSlice({
  name: 'complexTable',
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
  },
});

export const { setSearchText } = complexTableSlice.actions;
export default complexTableSlice.reducer;
