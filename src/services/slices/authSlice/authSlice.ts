import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { RootState } from '@store';
import { deleteCookie, setCookie } from '@utils-cookie';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return {
      ...res,
      user: JSON.parse(JSON.stringify(res.user))
    };
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return {
      ...res,
      user: JSON.parse(JSON.stringify(res.user))
    };
  }
);
export const getUser = createAsyncThunk('auth/getUser', getUserApi);
export const updateUser = createAsyncThunk('auth/updateUser', updateUserApi);
export const logout = createAsyncThunk('auth/logout', async () => {
  const res = await logoutApi();
  if (res.success) {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
});

type UserState = {
  user?: TUser;
  isAuth: boolean;
};

export const authInitialState: UserState = {
  isAuth: false
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: authInitialState,
  selectors: {
    selectUserStatus: (state) => state.isAuth,
    selectUser: (state) => state.user
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = undefined;
        state.isAuth = false;
      });
  }
});

export const { selectUserStatus, selectUser } = authSlice.getSelectors(
  (rootState: RootState) => rootState.auth
);
