import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fetchApi = createApi({
  reducerPath: 'fetchApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({}),
});
