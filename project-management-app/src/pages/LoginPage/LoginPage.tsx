import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks';
import { setIsLoading, setToken } from '../../store/authorizeSlice';
import { fetchApi } from '../../store/fetchApi';
import Form from '../../components/Form/Form';
import styles from './LoginPage.module.scss';
import Footer from '../../components/Footer/Footer';

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

  useEffect(() => {
    if (selector.auth.token) {
      navigate('/');
    }
  }, [selector.auth.token]);

  return (
    <div className={styles.container}>
      <Form login password isSignIn>
        {t('loginPage.buttons.login')}
      </Form>
      <Footer />
    </div>
  );
};

export default LoginPage;
