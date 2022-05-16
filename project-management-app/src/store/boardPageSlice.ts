import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetBoardByIdType } from './fetchApiTypes';

const initialState: GetBoardByIdType = {
  id: '',
  description: '',
  title: '',
  columns: [],
};

const boardPageSlice = createSlice({
  name: 'boardPage',
  initialState,
  reducers: {
    setBoardId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setBoardContent: (state, action: PayloadAction<GetBoardByIdType>) => {
      state.description = action.payload.description;
      state.columns = action.payload.columns;
      state.title = action.payload.title;
    },
  },
});

export const { setBoardId, setBoardContent } = boardPageSlice.actions;
export default boardPageSlice.reducer;
