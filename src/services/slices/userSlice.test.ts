import {
  initialState,
  userReducer,
  loginUserThunk,
  updateUserThunk,
  getUserThunk,
  logoutUserThunk,
  registerUserThunk,
  setUser,
  authCheck,
  userLogout
} from './userSlice';
describe('Проверка работы редьюсера [userSlice]', () => {
  const mockUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  test('Обработка экшена [setUser]', () => {
    const action = setUser(mockUser);
    const expectedState = { ...initialState, user: mockUser };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('Обработка экшена [authCheck]', () => {
    const action = authCheck();
    const expectedState = { ...initialState, isAuthChecked: true };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('Обработка экшена [userLogout]', () => {
    const action = userLogout();
    const state = { ...initialState, user: mockUser };
    const expectedState = { ...initialState, user: null };
    const newState = userReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  test('Обработка экшена [registerUserThunk.fulfilled]', () => {
    const action = {
      type: registerUserThunk.fulfilled.type,
      payload: { user: mockUser }
    };
    const expectedState = {
      ...initialState,
      isAuthChecked: true,
      user: mockUser
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('Обработка экшена [registerUserThunk.rejected]', () => {
    const action = {
      type: registerUserThunk.rejected.type,
      error: { message: 'Registration error' }
    };
    const expectedState = {
      ...initialState,
      error: 'Registration error'
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('Обработка экшена [loginUserThunk.fulfilled]', () => {
    const action = {
      type: loginUserThunk.fulfilled.type,
      payload: {
        user: mockUser,
        accessToken: 'access-token',
        refreshToken: 'refresh-token'
      }
    };
    const expectedState = {
      ...initialState,
      isAuthChecked: true,
      user: mockUser
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('Обработка экшена [loginUserThunk.rejected]', () => {
    const action = {
      type: loginUserThunk.rejected.type,
      error: { message: 'Login error' }
    };
    const expectedState = {
      ...initialState,
      error: 'Login error'
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('Обработка экшена [getUserThunk.fulfilled]', () => {
    const action = {
      type: getUserThunk.fulfilled.type,
      payload: { user: mockUser }
    };
    const expectedState = {
      ...initialState,
      isAuthChecked: true,
      user: mockUser
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('Обработка экшена [updateUserThunk.fulfilled]', () => {
    const action = {
      type: updateUserThunk.fulfilled.type,
      payload: { user: { ...mockUser, name: 'Updated User' } }
    };
    const state = { ...initialState, user: mockUser };
    const expectedState = {
      ...state,
      isAuthChecked: true,
      user: { ...mockUser, name: 'Updated User' },
      error: null
    };
    const newState = userReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  test('Обработка экшена [logoutUserThunk.fulfilled]', () => {
    const action = {
      type: logoutUserThunk.fulfilled.type
    };
    const expectedState = { ...initialState };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
