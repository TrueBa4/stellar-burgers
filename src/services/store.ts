import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  authSlice,
  burgerSlice,
  ordersSlice,
  ingredientsSlice,
  feedSlice
} from '@slices';

const rootReducer = combineReducers({
  burger: burgerSlice.reducer,
  auth: authSlice.reducer,
  ingredients: ingredientsSlice.reducer,
  orders: ordersSlice.reducer,
  feed: feedSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export { rootReducer };
export default store;
