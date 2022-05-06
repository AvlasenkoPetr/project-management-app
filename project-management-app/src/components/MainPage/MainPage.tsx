import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomSelector } from '../../customHooks/customHooks';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Main from './Main/Main';
import styles from './MainPage.module.scss';

const MainPage: React.FC = () => {
  const selector = useCustomSelector((state) => state.authorizeSlice);
  const navigation = useNavigate();
  useEffect(() => {
    !selector.isTokenValid && navigation('/welcome');
  });
  return (
    <div className={styles.container}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default MainPage;
