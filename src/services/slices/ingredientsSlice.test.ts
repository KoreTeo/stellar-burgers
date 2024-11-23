import { error } from 'console';
import {
  initialState,
  ingredientsReducer,
  getIngredientsThunk
} from './ingredientsSlice';

describe('Проверка работы редьюсера слайса [feeds]', () => {
  const mockIngredients = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      id: 'testIdBun'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      id: 'testIdMain'
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
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      id: 'testIdSauce'
    }
  ];
  test('Обработка экшена [getIngredientsThunk.pending]', () => {
    const action = {
      type: getIngredientsThunk.pending.type
    };
    const expectedResult = { ...initialState, loading: true, error: null };
    const newState = ingredientsReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Обработка экшена [getIngredientsThunk.rejected]', () => {
    const action = {
      type: getIngredientsThunk.rejected.type,
      error: { message: 'error' }
    };
    const expectedResult = { ...initialState, loading: false, error: 'error' };
    const newState = ingredientsReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('Обработка экшена [getIngredientsThunk.fulfilled]', () => {
    const action = {
      type: getIngredientsThunk.fulfilled.type,
      payload: mockIngredients
    };
    const expectedResult = {
      ...initialState,
      ingredients: mockIngredients,
      loading: false,
      buns: mockIngredients.filter((ingredient) => ingredient.type === 'bun'),
      mains: mockIngredients.filter((ingredient) => ingredient.type === 'main'),
      sauces: mockIngredients.filter(
        (ingredient) => ingredient.type === 'sauce'
      )
    };
    const newState = ingredientsReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
});
