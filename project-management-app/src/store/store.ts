import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { fetchApi } from './fetchApi';
import authorizeSlice from './authorizeSlice';
import mainPageSlice from './mainPageSlice';

const RootReducer = combineReducers({
  [fetchApi.reducerPath]: fetchApi.reducer,
  authorizeSlice: authorizeSlice,
  mainPageSlice: mainPageSlice,
});

const Store = () => {
  return configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fetchApi.middleware),
  });
};

export default Store;
export type StoreType = ReturnType<typeof Store>;
export type ReducerType = ReturnType<typeof RootReducer>;
export type StoreDispatchType = StoreType['dispatch'];
