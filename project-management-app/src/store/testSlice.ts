import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  id: number | null;
};

const initialState: initialStateType = {
  id: 911,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    test(state, action: PayloadAction<initialStateType>) {
      state.id = action.payload.id;
    },
  },
});

export const { test } = testSlice.actions;
export default testSlice.reducer;
