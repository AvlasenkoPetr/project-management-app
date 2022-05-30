import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardType } from './fetchApiTypes';

type initialStateType = {
  lang: 'ru' | 'en';
  data: {
    boards: Array<BoardType> | null;
  };
  isModalHide: boolean;
};

const initialState: initialStateType = {
  lang: 'en',
  data: {
    boards: null,
  },
  isModalHide: true,
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
    setIsModalHide: (state, action: PayloadAction<boolean>) => {
      state.isModalHide = action.payload;
    },
  },
});

export const { toggleLanguage, setBoards, setIsModalHide } = mainPageSlice.actions;
export default mainPageSlice.reducer;
