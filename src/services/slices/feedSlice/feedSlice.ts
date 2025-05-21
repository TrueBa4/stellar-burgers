import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '@store';

export const getFeed = createAsyncThunk('orders/getFeed', getFeedsApi);

type FeedState = {
  status: boolean;
  feed: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: FeedState = {
  feed: [],
  status: false,
  total: 0,
  totalToday: 0
};

export const feedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  selectors: {
    selectFeed: (state) => state.feed,
    selectFeedStatus: (state) => state.status,
    selectFeedTotal: (state) => state.total,
    selectFeedTotalToday: (state) => state.totalToday
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.status = true;
      })
      .addCase(getFeed.fulfilled, (state, { payload }) => {
        state.total = payload.total;
        state.totalToday = payload.totalToday;
        state.status = false;
        state.feed = payload.orders;
      });
  }
});

export const {
  selectFeedStatus,
  selectFeed,
  selectFeedTotal,
  selectFeedTotalToday
} = feedSlice.getSelectors((rootState: RootState) => rootState.feed);
