import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetBoardByIdType, GetColumnByIdType } from './fetchApiTypes';

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
      const columns = [...action.payload.columns];
      state.description = action.payload.description;
      state.columns = columns.sort((a, b) => a.order - b.order);
      state.title = action.payload.title;
    },
    setNewOrderColumns: (state, action: PayloadAction<GetColumnByIdType[]>) => {
      state.columns = [...action.payload];
    },
  },
});

export const { setBoardId, setBoardContent, setNewOrderColumns } = boardPageSlice.actions;
export default boardPageSlice.reducer;
