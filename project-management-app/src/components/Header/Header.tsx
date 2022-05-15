import React, { useEffect, useState } from 'react';
// import Button from '../../Button/Button';

import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';
// import { useCustomDispatch, useCustomSelector } from '../../../customHooks/customHooks';
import HeaderButton from './HeaderButton/HeaderButton';
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks';
import { fetchApi } from '../../store/fetchApi';
import { setBoards, toggleLanguage } from '../../store/mainPageSlice';
import { logOut } from '../../store/authorizeSlice';
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
  };

  const testCb = () => {
    console.log(test);
  };

  return (
    <header className={styles.container} style={{ opacity: scroll }}>
      <div className={styles.container__buttons_group}>
        <HeaderButton cb={testCb}>{t('mainPage.buttons.editProfile')}</HeaderButton>
        <HeaderButton cb={testCb}>{t('mainPage.buttons.createBoard')}</HeaderButton>
      </div>
      <div className={styles.container__buttons_group}>
        <HeaderButton cb={changeLanguage}>{t('mainPage.buttons.language')}</HeaderButton>
        <HeaderButton cb={logout}>{t('mainPage.buttons.logout')}</HeaderButton>
      </div>
    </header>
  );
};

export default Header;
