import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ReducerType, StoreDispatchType } from '../store/store';

export const useCustomDispatch = () => useDispatch<StoreDispatchType>();
export const useCustomSelector: TypedUseSelectorHook<ReducerType> = useSelector;
