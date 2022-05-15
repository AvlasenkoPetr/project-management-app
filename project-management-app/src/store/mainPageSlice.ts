import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardType } from './fetchApiTypes';

type initialStateType = {
  lang: 'ru' | 'en';
  data: {
    boards: Array<BoardType> | null;
  };
};

const initialState: initialStateType = {
  lang: 'en',
  data: {
    boards: null,
  },
};

const mainPageSlice = createSlice({
  name: 'mainPageSlice',
  initialState,
  reducers: {
    toggleLanguage: (state, action: PayloadAction<'en' | 'ru'>) => {
      state.lang = action.payload;
    },
    setBoards: (state, action: PayloadAction<Array<BoardType> | null>) => {
      state.data.boards = action.payload;
    },
  },
});

export const { toggleLanguage, setBoards } = mainPageSlice.actions;
export default mainPageSlice.reducer;
