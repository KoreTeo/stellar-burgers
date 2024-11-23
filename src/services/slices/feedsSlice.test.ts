import { initialState, feedsReducer, getFeedsThunk } from './feedsSlice';

describe('Проверка работы редьюсера слайса [feeds]', () => {
  const mockFeedsOrders = {
    orders: [
      {
        _id: '6740c650b27b06001c3e9d07',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный био-марсианский бургер',
        createdAt: '2024-11-22T17:58:40.195Z',
        updatedAt: '2024-11-22T17:58:41.214Z',
        number: 60135
      },
      {
        _id: '6740c589b27b06001c3e9d03',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0941'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный био-марсианский бургер',
        createdAt: '2024-11-22T17:55:21.081Z',
        updatedAt: '2024-11-22T17:55:22.288Z',
        number: 60134
      }
    ],
    total: 59809,
    totalToday: 146
  };
  test('Обработка экшена [getFeedsThunk.fulfilled]', () => {
    const action = {
      type: getFeedsThunk.fulfilled.type,
      payload: mockFeedsOrders
    };
    const expectedResult = {
      ...initialState,
      orders: mockFeedsOrders.orders,
      total: mockFeedsOrders.total,
      totalToday: mockFeedsOrders.totalToday
    };
    const newState = feedsReducer(initialState, action);

    expect(newState).toEqual(expectedResult);
  });
});
