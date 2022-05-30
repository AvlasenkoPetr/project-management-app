import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import ButtonBlueDark from '../../../components/ButtonBlueDark/ButtonBlueDark';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <header className={styles.container}>
      {localStorage.getItem('user') ? (
        <ButtonBlueDark cb={() => navigate('/')}>{t('welcomePage.buttons.toMain')}</ButtonBlueDark>
      ) : (
        <>
          <ButtonBlueDark cb={() => navigate('/login')}>
            {t('welcomePage.buttons.login')}
          </ButtonBlueDark>
          <ButtonBlueDark cb={() => navigate('/signup')}>
            {t('welcomePage.buttons.signUp')}
          </ButtonBlueDark>
        </>
      )}
    </header>
  );
};

export default Header;
