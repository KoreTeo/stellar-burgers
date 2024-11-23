import {
  constructorReducer,
  addConstructorItem,
  removeConstructorItem,
  moveConstructorItem,
  clearConstructor,
  initialState
} from './constructorSlice';

describe('Проверка работы редьюсера слайса [constructor]', () => {
  const bunIngredient = {
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
  };

  const mainIngredient = {
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
  };

  const sauceIngredient = {
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
  };

  const testInitialState = {
    ...initialState
  };

  test('Обработка экшена добавление ингредиента (булка) [addIngredient]', () => {
    const newState = constructorReducer(
      testInitialState,
      addConstructorItem(bunIngredient)
    );
    expect(newState.bun).toMatchObject({
      ...bunIngredient,
      id: newState.bun?.id
    });
  });
  test('Обработка экшена добавление ингредиента (основной) [addIngredient]', () => {
    const newState = constructorReducer(
      testInitialState,
      addConstructorItem(mainIngredient)
    );

    const expectedResult = [
      ...testInitialState.ingredients,
      { ...mainIngredient, id: newState.ingredients[0].id }
    ];

    expect(newState.ingredients).toEqual(expectedResult);
  });

  test('Обработка экшена удаления ингредиента [removeConstructorItem]', () => {
    const newState = constructorReducer(
      testInitialState,
      removeConstructorItem(sauceIngredient.id)
    );
    expect(newState).toEqual(initialState);
  });

  test('Обработка экшена изменения порядка ингредиентов в начинке (вверх) [moveConstructorItem]', () => {
    const fullState = {
      ...initialState,
      ingredients: [sauceIngredient, mainIngredient]
    };

    const newState = constructorReducer(
      fullState,
      moveConstructorItem({ index: 1, move: 'up' })
    );
    expect(newState.ingredients[0]).toEqual(mainIngredient);
    expect(newState.ingredients[1]).toEqual(sauceIngredient);
  });

  test('Обработка экшена изменения порядка ингредиентов в начинке (вниз) [moveConstructorItem]', () => {
    const fullState = {
      ...initialState,
      ingredients: [sauceIngredient, mainIngredient]
    };

    const newState = constructorReducer(
      fullState,
      moveConstructorItem({ index: 0, move: 'down' })
    );
    expect(newState.ingredients[0]).toEqual(mainIngredient);
    expect(newState.ingredients[1]).toEqual(sauceIngredient);
  });

  test('Обработка экшена очистки конструктора [clearConstructor]', () => {
    const fullState = {
      ...initialState,
      ingredients: [sauceIngredient, mainIngredient]
    };

    const newState = constructorReducer(fullState, clearConstructor());
    expect(newState).toEqual(initialState);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
