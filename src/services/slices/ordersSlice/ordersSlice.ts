import { getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '@store';

export const getUserOrders = createAsyncThunk('orders/getOrders', getOrdersApi);
export const getOrderByNumber = createAsyncThunk(
  'orders/getByNumber',
  async (num: number) => await getOrderByNumberApi(num)
);

type OrdersState = {
  status: boolean;
  orders: TOrder[];
  orderData?: TOrder;
};

const initialState: OrdersState = {
  status: false,
  orders: []
};

export const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState,
  selectors: {
    selectOrderByNumber: (state) => state.orderData,
    selectOrdersStatus: (state) => state.status,
    selectOrders: (state) => state.orders
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
        state.orderData = payload.orders[0];
      })

      .addCase(getUserOrders.pending, (state) => {
        state.status = true;
      })
      .addCase(getUserOrders.fulfilled, (state, { payload }) => {
        state.orders = payload;
        state.status = false;
      });
  }
});

export const { selectOrderByNumber, selectOrdersStatus, selectOrders } =
  ordersSlice.getSelectors((rootState: RootState) => rootState.orders);
