import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks';
import {
  setCanLogin,
  setIsLoading,
  setPassword,
  setToken,
  setUser,
} from '../../store/authorizeSlice';
import { fetchApi } from '../../store/fetchApi';
import Form from '../../components/Form/Form';

const SignUp: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useCustomDispatch();
  const selector = useCustomSelector((state) => state.authorizeSlice);
  const [signUp, {}] = fetchApi.useSignUpMutation();
  const [signIn, {}] = fetchApi.useSignInMutation();
  const onSubmit = async () => {
    const user = {
      name: 'andreyq',
      password: '123',
      login: '1aaawsswwaws0@gmail.com',
    };
    try {
      const response = await signUp(user).unwrap();
      dispatch(setUser(response));
      dispatch(setPassword(user.password));
      dispatch(setCanLogin(true));
    } catch (err) {
      console.log(err);
    }
  };

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
    <Form onSubmit={onSubmit} login password name passwordRepeat isSignIn>
      {t('signUpPage.buttons.signUp')}
    </Form>
  );
};

export default SignUp;
