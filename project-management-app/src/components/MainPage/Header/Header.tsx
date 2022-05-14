import React, { useEffect, useState } from 'react';
import Button from '../../Button/Button';

import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import { useCustomDispatch, useCustomSelector } from '../../../customHooks/customHooks';
import HeaderButton from './HeaderButton/HeaderButton';
import { setBoards, toggleLanguage } from '../../../store/mainPageSlice';
import { setToken, setIsLoading, logOut } from '../../../store/authorizeSlice';
import { fetchApi } from '../../../store/fetchApi';

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
    <header className={styles.contents__header} style={{ opacity: scroll }}>
      {/* <Button type="button">{t('mainPage.buttons.editProfile')}</Button>
      <Button type="button">{t('mainPage.buttons.createBoard')}</Button>
      <Button onClick={() => changeLanguage()} type="button">
        {t('mainPage.buttons.language')}
      </Button>
      <Button type="button" danger>
        {t('mainPage.buttons.logout')}
      </Button> */}
      <HeaderButton cb={testCb}>{t('mainPage.buttons.editProfile')}</HeaderButton>
      <HeaderButton cb={testCb}>{t('mainPage.buttons.createBoard')}</HeaderButton>
      <HeaderButton cb={changeLanguage}>{t('mainPage.buttons.language')}</HeaderButton>
      <HeaderButton cb={logout}>{t('mainPage.buttons.logout')}</HeaderButton>
    </header>
  );
};

export default Header;
