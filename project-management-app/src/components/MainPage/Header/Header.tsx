import React, { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import styles from './Header.module.scss';
import '../Header/HeaderComponents/HeaderStyles.scss';
import { useTranslation } from 'react-i18next';
import { useCustomDispatch, useCustomSelector } from '../../../customHooks/customHooks';
import { toggleLanguage } from '../../../store/mainPageSlice';

const Header: React.FC = () => {
  const dark = 'rgba(0, 0, 0, 0.6)';
  const light = 'rgba(0, 0, 0, 0.2)';
  const [scroll, setScroll] = useState(dark);
  const { t, i18n } = useTranslation();
  const selector = useCustomSelector((state) => state);
  const dispatch = useCustomDispatch();

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

  const changeLanguage = async () => {
    dispatch(toggleLanguage(selector.mainPageSlice.lang === 'en' ? 'ru' : 'en'));
    console.log(selector.mainPageSlice.lang);
  };

  return (
    <div className="section-heder">
      <header className="contents__heder" style={{ background: scroll }}>
        <Button type="button">{t('mainPage.buttons.editProfile')}</Button>
        <Button type="button">{t('mainPage.buttons.createBoard')}</Button>
        <Button onClick={() => changeLanguage()} type="button">
          {t('mainPage.buttons.language')}
        </Button>
        <Button type="button" danger>
          {t('mainPage.buttons.logout')}
        </Button>
      </header>
    </div>
  );
};

export default Header;
