import store, { rootReducer } from '@store';

describe('Проверяем правильную инициализацию rootReducer', () => {
  it('возвращает корректное начальное состояние хранилища', () => {
    const initialState = store.getState();
    const afterAction = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });
    expect(afterAction).toEqual(initialState);
  });
});
