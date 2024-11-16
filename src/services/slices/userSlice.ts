import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  updateUserApi,
  logoutApi,
  getUserApi
} from '../../utils/burger-api';
import { TUser } from '@utils-types';

export const registerUserThunk = createAsyncThunk(
  'user/register',
  registerUserApi
);
export const loginUserThunk = createAsyncThunk('user/login', loginUserApi);
export const updateUserThunk = createAsyncThunk('user/update', updateUserApi);
export const getUserThunk = createAsyncThunk('user/request', getUserApi);

export const checkUserAuthThunk = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }): Promise<void> => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => dispatch(setUser(res.user)))
        .catch((): void => {
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
        })
        .finally(() => dispatch(authCheck()));
    } else {
      dispatch(authCheck());
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
        dispatch(userLogout());
      })
      .catch(() => {});
  }
);

type TUserState = {
  isAuthChecked: boolean;
  user: TUser | null;
  error: string | null;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  error: null
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.user = null;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getUserData: (state) => state,
    getUserIsAuth: (state) => state.isAuthChecked,
    getUserError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {})
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      });
    builder
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.user = action.payload.user;
      });
    builder
      .addCase(getUserThunk.pending, (state, action) => {})
      .addCase(getUserThunk.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.error = action.error.message!;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      });
    builder
      .addCase(updateUserThunk.pending, (state) => {})
      .addCase(updateUserThunk.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.user = action.payload.user;
      });
  }
});

export const userReducer = UserSlice.reducer;
export const { setUser, authCheck, userLogout } = UserSlice.actions;
export const { getUserData, getUserError, getUserIsAuth, getUser } =
  UserSlice.selectors;
