import React, { useEffect, useState } from 'react';
// import Button from '../../Button/Button';

import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';
// import { useCustomDispatch, useCustomSelector } from '../../../customHooks/customHooks';
import ButtonBlueDark from '../ButtonBlueDark/ButtonBlueDark';
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks';
import { fetchApi } from '../../store/fetchApi';
import { setBoards, toggleLanguage } from '../../store/mainPageSlice';
import { logOut } from '../../store/authorizeSlice';
import { useNavigate } from 'react-router-dom';
// import { setBoards, toggleLanguage } from '../../../store/mainPageSlice';
// import { setToken, setIsLoading, logOut } from '../../../store/authorizeSlice';
// import { fetchApi } from '../../../store/fetchApi';

const Header: React.FC = () => {
  const dark = '1';
  const light = '0.5';
  const [scroll, setScroll] = useState(dark);
  const { t, i18n } = useTranslation();
  const selector = useCustomSelector((state) => state);
  const dispatch = useCustomDispatch();
  const { refetch } = fetchApi.useGetAllBoardsQuery('');
  const navigation = useNavigate();

  const listenScrollEvent = () => {
    if (window.scrollY > 100) {
      setScroll(light);
    } else {
      setScroll(dark);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
    i18n.changeLanguage(selector.mainPageSlice.lang);
  }, [selector.mainPageSlice.lang]);

  const changeLanguage = () => {
    dispatch(toggleLanguage(selector.mainPageSlice.lang === 'en' ? 'ru' : 'en'));
    console.log(selector.mainPageSlice.lang);
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch(setBoards(null));
    dispatch(logOut());
    refetch();
    navigation('/login');
  };

  const testCb = () => {
    console.log(test);
  };

  const profilePage = () => {
    navigation('/editprofile');
  };

  return (
    <header className={styles.container} style={{ opacity: scroll }}>
      <div className={styles.container__buttons_group}>
        <ButtonBlueDark cb={profilePage}>{t('mainPage.buttons.editProfile')}</ButtonBlueDark>
        <ButtonBlueDark cb={testCb}>{t('mainPage.buttons.createBoard')}</ButtonBlueDark>
      </div>
      <div className={styles.container__buttons_group}>
        <ButtonBlueDark cb={changeLanguage}>{t('mainPage.buttons.language')}</ButtonBlueDark>
        <ButtonBlueDark cb={logout}>{t('mainPage.buttons.logout')}</ButtonBlueDark>
      </div>
    </header>
  );
};

export default Header;
