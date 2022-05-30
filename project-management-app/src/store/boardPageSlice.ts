import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetBoardByIdType, GetColumnByIdType, TaskType } from './fetchApiTypes';

const initialState: GetBoardByIdType = {
  id: '',
  description: '',
  title: '',
  columns: [],
};

type setNewOrderTasksType = {
  columnId: string;
  tasks: TaskType[];
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
      const a = [...columns].map((item) => {
        return {
          ...item,
          tasks: [...item.tasks].sort((a, b) => a.order - b.order),
        };
      });
      state.description = action.payload.description;
      state.columns = a.sort((a, b) => a.order - b.order);
      state.title = action.payload.title;
    },
    setNewOrderColumns: (state, action: PayloadAction<GetColumnByIdType[]>) => {
      state.columns = [...action.payload];
    },
    setNewOrderTasks: (state, action: PayloadAction<setNewOrderTasksType>) => {
      const column = [...state.columns.filter((item) => item.id === action.payload.columnId)];
      column[0].tasks = action.payload.tasks.sort((a, b) => a.order - b.order);
    },
  },
});

export const { setBoardId, setNewOrderTasks, setBoardContent, setNewOrderColumns } =
  boardPageSlice.actions;
export default boardPageSlice.reducer;
