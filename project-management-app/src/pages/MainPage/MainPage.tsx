import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks';
import { setIsLoading, setToken } from '../../store/authorizeSlice';
import { fetchApi } from '../../store/fetchApi';
import { setBoards } from '../../store/mainPageSlice';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Main from './Main/Main';
import styles from './MainPage.module.scss';
import { Loader } from '../../components/Loader/Loader';

const MainPage: React.FC = () => {
  const selector = useCustomSelector((state) => state);
  const dispatch = useCustomDispatch();
  const navigation = useNavigate();

  const { data, error } = fetchApi.useGetAllBoardsQuery('');
  useEffect(() => {
    if (data) {
      dispatch(setBoards(data));
    }
  }, [data]);
  useEffect(() => {
    if (error && !selector.authorizeSlice.auth.token) navigation('/welcome');
  }, [error]);
  useEffect(() => {
    if (selector.mainPageSlice.data.boards) {
      dispatch(setIsLoading(true));
    }
  }, [selector.mainPageSlice.data.boards]);
  return (
    <>
      <div className={styles.container}>
        <Header />
        {selector.authorizeSlice.isLoading ? <Main /> : <Loader />}
        <Footer />
      </div>
    </>
  );
};

export default MainPage;
