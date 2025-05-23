import {
  ingredientsSlice,
  ingredientsInitialState,
  getIngredients
} from '@slices';
import mockData from './mockData';

describe('Проверяем редьюсер ingredientsSlice', () => {
  it('Пробуем подставить в status true при getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsSlice.reducer(ingredientsInitialState, action);

    expect(state.status).toBe(true);
  });

  it('Пробуем подставить в status false при getIngredients.fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockData[0]
    };

    const state = ingredientsSlice.reducer(ingredientsInitialState, action);

    expect(state.ingredients).toEqual(mockData[0]);
    expect(state.status).toBe(false);
  });

  it('Пробуем подставить в status false при getIngredients.rejected', () => {
    const action = { type: getIngredients.rejected.type };

    const state = ingredientsSlice.reducer(
      { ...ingredientsInitialState, status: true },
      action
    );

    expect(state.status).toBe(false);
  });
});
