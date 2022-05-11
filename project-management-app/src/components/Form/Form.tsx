import React, { FormEventHandler } from 'react';
import styles from './Form.module.scss';
import Input from './Input/Input';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks';
import { setToken } from '../../store/authorizeSlice';
import { fetchApi } from '../../store/fetchApi';
import { SignInResponseType } from '../../store/fetchApiTypes';

type Props = {
  children: string;
  login: boolean;
  name?: boolean;
  password: boolean;
  passwordRepeat?: boolean;
};

const Form: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const dispatch = useCustomDispatch();
  const [signUp, {}] = fetchApi.useSignUpMutation();
  const [signIn, { error: signInError }] = fetchApi.useSignInMutation();

  async function FormSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    try {
      const SignIn = await signIn({
        login: 'a123@gmail.com',
        password: '123456789',
      }).unwrap();
      dispatch(
        setToken({
          auth: {
            token: SignIn.token,
          },
        })
      );
    } catch (err) {}
    navigate('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles['form__wrapper']}>
        <form onSubmit={FormSubmit}>
          {props.login && <Input type="text">Login</Input>}
          {props.name && <Input type="text">Name</Input>}
          {props.password && <Input type="password">Password</Input>}
          {props.passwordRepeat && <Input type="password">Password (repeat)</Input>}
          <Button type="submit">{props.children}</Button>
        </form>
      </div>
    </div>
  );
};

export default Form;
