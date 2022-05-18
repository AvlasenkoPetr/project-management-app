import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks';
import { setIsLoading, setToken } from '../../store/authorizeSlice';
import { fetchApi } from '../../store/fetchApi';
import { setBoards } from '../../store/mainPageSlice';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Main from './Main/Main';
import styles from './BoardPage.module.scss';
import { setBoardContent } from '../../store/boardPageSlice';

const BoardPage: React.FC = () => {
  const selector = useCustomSelector((state) => state);
  const dispatch = useCustomDispatch();
  const navigation = useNavigate();
  const { data, error, isLoading, refetch } = fetchApi.useGetBoardByIdQuery(
    selector.boardPageSlice.id
  );
  useEffect(() => {
    if (error) navigation('/');
  }, [error]);
  useEffect(() => {
    if (data) dispatch(setBoardContent(data));
  }, [data]);
  useEffect(() => {
    if (!selector.authorizeSlice.auth.token) navigation('/login');
  }, [selector.authorizeSlice.auth.token]);
  return (
    <>
      <div className={styles.container}>
        <Header />
        {!isLoading && data ? <Main /> : <div>Загружаемся</div>}
        <Footer />
      </div>
    </>
  );
};

export default BoardPage;
