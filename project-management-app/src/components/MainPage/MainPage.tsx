import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks';
import { setIsLoading, setToken } from '../../store/authorizeSlice';
import { fetchApi } from '../../store/fetchApi';
import { setBoards } from '../../store/mainPageSlice';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Main from './Main/Main';
import styles from './MainPage.module.scss';

type localStorageType = {
  token: string;
};

const MainPage: React.FC = () => {
  const selector = useCustomSelector((state) => state);
  const dispatch = useCustomDispatch();
  const navigation = useNavigate();
  const token: localStorageType = JSON.parse(localStorage.getItem('user') as string);
  if (token) dispatch(setToken(token.token));
  const { data, error } = fetchApi.useGetAllBoardsQuery('');
  useEffect(() => {
    if (data) dispatch(setBoards(data));
  }, [data]);
  useEffect(() => {
    if (error && !selector.authorizeSlice.auth.token) navigation('/login');
  }, [error]);
  useEffect(() => {
    if (selector.mainPageSlice.data.boards) dispatch(setIsLoading(true));
  }, [selector.mainPageSlice.data.boards]);
  return (
    <>
      {selector.authorizeSlice.isLoading ? (
        <div className={styles.container}>
          <Header />
          <Main />
          <Footer />
        </div>
      ) : (
        <div>Загружаемся</div>
      )}
    </>
  );
};

export default MainPage;
