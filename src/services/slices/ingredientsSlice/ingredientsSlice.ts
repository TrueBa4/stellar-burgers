import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '@store';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

type IngredientsState = {
  ingredients: TIngredient[];
  status: boolean;
};

export const ingredientsInitialState: IngredientsState = {
  ingredients: [],
  status: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredientsSlice',
  initialState: ingredientsInitialState,
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectBuns: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'bun'),
    selectMains: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'main'),
    selectSauces: (state) =>
      state.ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    selectIngredientById: (state, id) =>
      state.ingredients.find((ingredient) => ingredient._id === id),
    selectIngredientsStatus: (state) => state.status
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = true;
      })
      .addCase(getIngredients.fulfilled, (state, { payload }) => {
        state.ingredients = payload;
        state.status = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.status = false;
      });
  }
});

export const {
  selectIngredients,
  selectBuns,
  selectMains,
  selectSauces,
  selectIngredientById,
  selectIngredientsStatus
} = ingredientsSlice.getSelectors(
  (rootState: RootState) => rootState.ingredients
);
