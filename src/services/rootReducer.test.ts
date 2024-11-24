import { rootReducer } from './rootReducer';
import store from './store';

describe('Тесты rootReducer', () => {
  const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  test('Проверка правильной инициализации rootReducer', () => {
    expect(store.getState()).toEqual(newState);
  });
});
