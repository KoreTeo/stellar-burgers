import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '../../utils/burger-api';

export const getFeedsThunk = createAsyncThunk('orders/getAll', getFeedsApi);

type TFeeds = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export const initialState: TFeeds = {
  orders: [],
  total: 0,
  totalToday: 0
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedsState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {})
      .addCase(getFeedsThunk.rejected, (state, action) => {})
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const feedsReducer = feedsSlice.reducer;
export const { getFeedsState } = feedsSlice.selectors;
