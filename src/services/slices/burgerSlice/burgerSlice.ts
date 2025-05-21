import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { RootState } from '@store';
import { orderBurgerApi } from '@api';

export const orderBurger = createAsyncThunk(
  'orders/orderBurger',
  orderBurgerApi
);

type BurgerState = {
  bun?: TConstructorIngredient;
  ingredients: TConstructorIngredient[];
  status: boolean;
  burger: TOrder | null;
};

const initialState: BurgerState = {
  bun: undefined,
  ingredients: [],
  status: false,
  burger: null
};

export const burgerSlice = createSlice({
  name: 'burgerSlice',
  initialState,
  selectors: {
    selectOrder: (state) => ({
      bun: state.bun,
      ingredients: state.ingredients
    }),
    selectBurger: (state) => state.burger,
    selectOrderStatus: (state) => state.status
  },
  reducers: {
    removeAll: (state) => {
      state.burger = null;
      state.status = false;
      state.bun = undefined;
      state.ingredients = [];
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (payload: TIngredient) => {
        const id = nanoid();
        return { payload: { id, ...payload } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (action.payload.type === 'bun') return;
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    moveDown: (state, action: PayloadAction<number>) => {
      const temp = state.ingredients[action.payload + 1];
      state.ingredients[action.payload + 1] = state.ingredients[action.payload];
      state.ingredients[action.payload] = temp;
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const temp = state.ingredients[action.payload - 1];
      state.ingredients[action.payload - 1] = state.ingredients[action.payload];
      state.ingredients[action.payload] = temp;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.status = true;
      })
      .addCase(orderBurger.fulfilled, (state, { payload }) => {
        state.burger = payload.order;
        state.status = false;
      });
  }
});

export const { selectOrder, selectOrderStatus, selectBurger } =
  burgerSlice.getSelectors((rootState: RootState) => rootState.burger);

export const { removeAll, addIngredient, removeIngredient, moveDown, moveUp } =
  burgerSlice.actions;
