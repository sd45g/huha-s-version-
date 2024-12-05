import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TrendingNftsState {
  isSlideBegin: boolean;
  isSlideEnd: boolean;
}

const initialState: TrendingNftsState = {
  isSlideBegin: true,
  isSlideEnd: false,
};

const trendingNftsSlice = createSlice({
  name: 'trendingNfts',
  initialState,
  reducers: {
    setSlideStatus(state, action: PayloadAction<{ isSlideBegin: boolean; isSlideEnd: boolean }>) {
      state.isSlideBegin = action.payload.isSlideBegin;
      state.isSlideEnd = action.payload.isSlideEnd;
    },
  },
});

export const { setSlideStatus } = trendingNftsSlice.actions;
export default trendingNftsSlice.reducer;
