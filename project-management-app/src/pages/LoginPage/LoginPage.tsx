import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks';
import { setIsLoading, setToken } from '../../store/authorizeSlice';
import { fetchApi } from '../../store/fetchApi';
import Form from '../../components/Form/Form';
import styles from './LoginPage.module.scss';

const LoginPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [signIn, {}] = fetchApi.useSignInMutation();
  const dispatch = useCustomDispatch();
  const navigate = useNavigate();
  const selector = useCustomSelector((state) => state.authorizeSlice);
  useEffect(() => {
    if (selector.isLoading) navigate('/');
  });
  const onSubmit = async () => {
    const user = {
      password: '123',
      login: '0000a0sswa1@gmail.com',
    };
    try {
      const response = await signIn(user).unwrap();
      dispatch(setToken(response.token));
      dispatch(setIsLoading(true));
      localStorage.setItem('user', JSON.stringify(response));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <Form onSubmit={onSubmit} login password isSignUp>
        {t('loginPage.buttons.login')}
      </Form>
    </div>
  );
};

export default LoginPage;
