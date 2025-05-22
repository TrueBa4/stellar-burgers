import { feedSlice, getFeed, feedInitialState } from '@slices';

describe('Проверяем редьюсер feedSlice', () => {
  const feeds = {
    orders: [
      {
        _id: '1',
        name: 'Краторный метеоритный бургер',
        status: 'done',
        number: 1
      },
      {
        _id: '2',
        name: 'Space флюоресцентный бургер',
        status: 'in-progress',
        number: 2
      }
    ],
    total: 4,
    totalToday: 3
  };

  it('Проверяем обработку getFeed.pending', () => {
    const action = { type: getFeed.pending.type };
    const state = feedSlice.reducer(feedInitialState, action);
    expect(state.status).toBe(true);
  });

  it('Проверяем обработку getFeed.fulfilled', () => {
    const action = {
      type: getFeed.fulfilled.type,
      payload: feeds
    };

    const state = feedSlice.reducer(feedInitialState, action);

    expect(state.feed).toEqual(feeds.orders);
    expect(state.total).toBe(4);
    expect(state.totalToday).toBe(3);
    expect(state.status).toBe(false);
  });
});
