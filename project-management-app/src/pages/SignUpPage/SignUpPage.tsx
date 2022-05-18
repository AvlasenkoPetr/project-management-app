import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks';
import { setIsLoading, setToken } from '../../store/authorizeSlice';
import { fetchApi } from '../../store/fetchApi';
import Form from '../../components/Form/Form';
import styles from './SignUp.module.scss';

const SignUp: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useCustomDispatch();
  const selector = useCustomSelector((state) => state.authorizeSlice);
  const [signIn, {}] = fetchApi.useSignInMutation();

  useEffect(() => {
    if (selector.isLoading) navigate('/');
  });

  useEffect(() => {
    if (selector.canLogin) autoLogin();
  }, [selector.canLogin]);

  const autoLogin = async () => {
    const user = {
      login: selector.auth.login,
      password: selector.auth.password,
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
      <Form login password name passwordRepeat isSignUp>
        {t('signUpPage.buttons.signUp')}
      </Form>
    </div>
  );
};

export default SignUp;
