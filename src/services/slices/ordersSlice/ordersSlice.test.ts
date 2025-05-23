import {
  ordersSlice,
  getUserOrders,
  getOrderByNumber,
  ordersInitialState
} from '@slices';

describe('Проверяем редьюсер ordersSlice', () => {
  const orders = [
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
  ];

  it('Проверяем обработку getUserOrders.pending', () => {
    const action = { type: getUserOrders.pending.type };
    const state = ordersSlice.reducer(ordersInitialState, action);
    expect(state.status).toBe(true);
  });

  it('Проверяем обработку getUserOrders.fulfilled', () => {
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: orders
    };

    const state = ordersSlice.reducer(ordersInitialState, action);
    expect(state.orders).toEqual(orders);
    expect(state.status).toBe(false);
  });

  it('Проверяем обработку getOrderByNumber.fulfilled', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [orders[0]] }
    };

    const state = ordersSlice.reducer(ordersInitialState, action);
    expect(state.orderData).toEqual(orders[0]);
  });
});
