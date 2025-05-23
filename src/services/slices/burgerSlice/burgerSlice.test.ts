import { TConstructorIngredient } from '@utils-types';
import { burgerSlice, burgerInitialState } from '@slices';
import mockData from '../ingredientsSlice/mockData';

describe('Проверяем редьюсер слайса конструктора', () => {
  const bun = mockData.find(
    (element) => element.type === 'bun'
  ) as TConstructorIngredient;

  const sauce = {
    ...(mockData.find(
      (element) => element.type === 'sauce'
    ) as TConstructorIngredient),
    id: '1'
  };

  const main = {
    ...(mockData.find(
      (element) => element.type === 'main'
    ) as TConstructorIngredient),
    id: '2'
  };

  it('Обработка экшена добавления ингредиента булки', () => {
    const action = burgerSlice.actions.addIngredient(bun);
    const state = burgerSlice.reducer(burgerInitialState, action);

    expect(state.bun).toMatchObject(bun);
  });

  it('Обработка экшена удаления ингредиента', () => {
    const initialStateIngredients = {
      ...burgerInitialState,
      ingredients: [sauce]
    };

    const action = burgerSlice.actions.removeIngredient(sauce);
    const state = burgerSlice.reducer(initialStateIngredients, action);

    expect(state.ingredients).toHaveLength(0);
  });

  it('Обработка экшена добавления ингредиента соуса', () => {
    const action = burgerSlice.actions.addIngredient(sauce);
    const state = burgerSlice.reducer(burgerInitialState, action);

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(sauce);
  });

  it('Обработка экшена изменения порядка ингредиентов в начинке - вниз', () => {
    const initialStateIngredients = {
      ...burgerInitialState,
      ingredients: [sauce, main]
    };

    const action = burgerSlice.actions.moveDown(0);
    const state = burgerSlice.reducer(initialStateIngredients, action);

    expect(state.ingredients[0].id).toBe('2');
    expect(state.ingredients[1].id).toBe('1');
  });

  it('Обработка экшена изменения порядка ингредиентов в начинке - вверх', () => {
    const initialStateIngredients = {
      ...burgerInitialState,
      ingredients: [sauce, main]
    };

    const action = burgerSlice.actions.moveUp(1);
    const state = burgerSlice.reducer(initialStateIngredients, action);

    expect(state.ingredients[0].id).toBe('2');
    expect(state.ingredients[1].id).toBe('1');
  });
});
