import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks';
import { setIsLoading, setToken } from '../../store/authorizeSlice';
import { fetchApi } from '../../store/fetchApi';
import Form from '../../components/Form/Form';
import styles from './LoginPage.module.scss';

export interface ILoginBody {
  login: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const selector = useCustomSelector((state) => state.authorizeSlice);
  useEffect(() => {
    if (selector.isLoading) navigate('/');
  });

  return (
    <div className={styles.container}>
      <Form login password isSignIn>
        {t('loginPage.buttons.login')}
      </Form>
    </div>
  );
};

export default LoginPage;
