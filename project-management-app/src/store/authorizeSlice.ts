import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  isTokenValid: boolean;
};

const initialState: initialStateType = {
  isTokenValid: false,
};

const authorizeSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    verifyToken(state, action: PayloadAction<initialStateType>) {
      state.isTokenValid = action.payload.isTokenValid;
    },
  },
});

export const { verifyToken } = authorizeSlice.actions;
export default authorizeSlice.reducer;
