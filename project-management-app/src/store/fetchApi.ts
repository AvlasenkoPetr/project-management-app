import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  BoardType,
  GetUserByIdResponseType,
  UpdateUserByIdRequestType,
  UpdateUserByIdResponseType,
  GetBoardByIdType,
  ColumnType,
  GetColumnByIdType,
  TaskType,
  CreateNewTaskRequestType,
  TaskResponseType,
  UpdateTaskRequestType,
  SignInResponseType,
  SignInRequestType,
  SignUpResponseType,
  SignUpRequestType,
} from './fetchApiTypes';
import type { ReducerType, StoreType } from './store';

export const fetchApi = createApi({
  reducerPath: 'fetchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://powerful-tundra-27687.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', 'no-cors');
      const token = (getState() as ReducerType).authorizeSlice.auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<Array<GetUserByIdResponseType>, unknown>({
      query: () => '/users',
    }),
    getUserById: builder.query<GetUserByIdResponseType, string>({
      query: (id) => `/users/${id}`,
    }),
    deleteUserById: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
    updateUserById: builder.mutation<UpdateUserByIdResponseType, UpdateUserByIdRequestType>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: body,
      }),
    }),
    signIn: builder.mutation<SignInResponseType, SignInRequestType>({
      query: (body) => ({
        url: '/signin',
        method: 'POST',
        body: body,
      }),
    }),
    signUp: builder.mutation<SignUpResponseType, SignUpRequestType>({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body: body,
      }),
    }),
    getAllBoards: builder.query<Array<BoardType>, unknown>({
      query: () => '/boards',
    }),
    createNewBoard: builder.mutation<BoardType, { title: string; description: string }>({
      query: (body) => ({
        url: '/boards',
        method: 'POST',
        body: body,
      }),
    }),
    getBoardById: builder.query<GetBoardByIdType, string>({
      query: (id) => `/boards/${id}`,
    }),
    deleteBoardById: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
      }),
    }),
    updateBoardById: builder.mutation<
      BoardType,
      { id: string; body: { title: string; description: string } }
    >({
      query: ({ id, body }) => ({
        url: `/boards/${id}`,
        method: 'PUT',
        body: body,
      }),
    }),
    getAllColumns: builder.query<Array<ColumnType>, string>({
      query: (boardId) => `/boards/${boardId}/columns`,
    }),
    createNewColumn: builder.mutation<ColumnType, { body: { title: string }; boardId: string }>({
      query: ({ body, boardId }) => ({
        url: `/boards/${boardId}/columns`,
        method: 'POST',
        body: body,
      }),
    }),
    getColumnById: builder.query<GetColumnByIdType, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => `/boards/${boardId}/columns/${columnId}`,
    }),
    deleteColumn: builder.mutation<unknown, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'DELETE',
      }),
    }),
    updateColumn: builder.mutation<
      ColumnType,
      { boardId: string; columnId: string; body: { title: string; order: number } }
    >({
      query: ({ boardId, columnId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}`,
        method: 'PUT',
        body: body,
      }),
    }),
    getAllTasks: builder.query<Array<TaskType>, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) => `/boards/${boardId}/columns/${columnId}/tasks`,
    }),
    createNewTask: builder.mutation<TaskResponseType, CreateNewTaskRequestType>({
      query: ({ columnId, boardId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks`,
        method: 'POST',
        body: body,
      }),
    }),
    getTaskById: builder.query<TaskType, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) =>
        `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    }),
    deleteTask: builder.mutation<unknown, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
    }),
    updateTask: builder.mutation<TaskResponseType, UpdateTaskRequestType>({
      query: ({ boardId, columnId, taskId, body }) => ({
        url: `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        method: 'PUT',
        body: body,
      }),
    }),
  }),
});
