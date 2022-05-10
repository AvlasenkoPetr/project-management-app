import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  auth: {
    token: string;
  };
};

const initialState: initialStateType = {
  auth: {
    token: '',
  },
};

const authorizeSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<initialStateType>) {
      console.log(action);
      state.auth.token = action.payload.auth.token;
    },
  },
});

export const { setToken } = authorizeSlice.actions;
export default authorizeSlice.reducer;
