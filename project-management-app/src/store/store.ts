import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { fetchApi } from './fetchApi';
import authorizeSlice from './authorizeSlice';
import mainPageSlice from './mainPageSlice';
import boardPageSlice from './boardPageSlice';
import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';

const RootReducer = combineReducers({
  [fetchApi.reducerPath]: fetchApi.reducer,
  authorizeSlice: authorizeSlice,
  mainPageSlice: mainPageSlice,
  boardPageSlice: boardPageSlice,
});

const Store = () => {
  return configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fetchApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export default Store;
export type StoreType = ReturnType<typeof Store>;
export type ReducerType = ReturnType<typeof RootReducer>;
export type StoreDispatchType = StoreType['dispatch'];
