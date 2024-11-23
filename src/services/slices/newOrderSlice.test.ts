import { initialState, newOrderReducer, newOrderThunk } from './newOrderSlice';

describe('Проверка работы редьюсера слайса [newOrder]', () => {
  const mockOrder = {
    success: true,
    name: 'Флюоресцентный люминесцентный бургер',
    order: {
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0942',
          name: 'Соус Spicy-X',
          type: 'sauce',
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0
        }
      ],
      _id: '67416ffab27b06001c3e9fc3',
      owner: {
        name: 'Test',
        email: 'test@mail.com',
        createdAt: '2024-11-16T15:56:24.847Z',
        updatedAt: '2024-11-16T16:52:32.056Z'
      },
      status: 'done',
      name: 'Флюоресцентный spicy люминесцентный бургер',
      createdAt: '2024-11-23T06:02:34.563Z',
      updatedAt: '2024-11-23T06:02:35.396Z',
      number: 60185,
      price: 3054
    }
  };
  test('Обработка экшена [newOrderThunk.pending]', () => {
    const action = {
      type: newOrderThunk.pending.type
    };

    const expectedResult = { ...initialState, orderRequest: true };
    const newState = newOrderReducer(initialState, action);

    expect(newState).toEqual(expectedResult);
  });
  test('Обработка экшена [newOrderThunk.rejected]', () => {
    const action = {
      type: newOrderThunk.rejected.type
    };

    const expectedResult = { ...initialState, orderRequest: false };
    const newState = newOrderReducer(initialState, action);

    expect(newState).toEqual(expectedResult);
  });
  test('Обработка экшена [newOrderThunk.fulfilled]', () => {
    const action = {
      type: newOrderThunk.fulfilled.type,
      payload: mockOrder
    };

    const expectedResult = {
      ...initialState,
      orderRequest: false,
      order: mockOrder.order,
      name: mockOrder.name
    };
    const newState = newOrderReducer(initialState, action);

    expect(newState).toEqual(expectedResult);
  });
});
