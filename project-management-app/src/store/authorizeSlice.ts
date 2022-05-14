import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignUpResponseType } from './fetchApiTypes';

type initialStateType = {
  isLoading: boolean;
  auth: {
    token: string;
    id: string;
    login: string;
    password: string;
  };
  canLogin: boolean;
};

const initialState: initialStateType = {
  isLoading: false,
  auth: {
    token: '',
    id: '',
    login: '',
    password: '',
  },
  canLogin: false,
};

const authorizeSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.auth.token = action.payload;
    },
    setUser(state, action: PayloadAction<SignUpResponseType>) {
      state.auth.id = action.payload.id;
      state.auth.login = action.payload.login;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.auth.password = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setCanLogin(state, action: PayloadAction<boolean>) {
      state.canLogin = action.payload;
    },
    logOut(state) {
      state.isLoading = false;
      state.auth.token = '';
      state.auth.id = '';
      state.auth.login = '';
      state.auth.password = '';
      state.canLogin = false;
    },
  },
});

export const { setToken, setUser, setPassword, setIsLoading, setCanLogin, logOut } =
  authorizeSlice.actions;
export default authorizeSlice.reducer;
