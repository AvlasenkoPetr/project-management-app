import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  lang: 'ru' | 'en';
};

const initialState: initialStateType = {
  lang: 'en',
};

const mainPageSlice = createSlice({
  name: 'mainPageSlice',
  initialState,
  reducers: {
    toggleLanguage: (state, action: PayloadAction<'en' | 'ru'>) => {
      state.lang = action.payload;
    },
  },
});

export const { toggleLanguage } = mainPageSlice.actions;
export default mainPageSlice.reducer;
