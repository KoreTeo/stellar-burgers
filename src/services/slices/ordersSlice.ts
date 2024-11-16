import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '../../utils/burger-api';

export const getOrdersThunk = createAsyncThunk(
  'orders/userOrders',
  getOrdersApi
);

type TOrdersState = {
  orders: TOrder[];
};

export const initialState: TOrdersState = {
  orders: []
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersThunk.pending, (state) => {})
      .addCase(getOrdersThunk.rejected, (state, action) => {})
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
export const { getOrders } = ordersSlice.selectors;
