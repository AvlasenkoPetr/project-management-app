import React, { useEffect, useState } from 'react';
import styles from './Form.module.scss';
import Input from './Input/Input';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { FormInput } from '../FormInput/FormInput';

type Props = {
  children: string;
  isSignIn?: boolean;
  isSignUp?: boolean;
  login: boolean;
  name?: boolean;
  password: boolean;
  passwordRepeat?: boolean;
  onSubmit?: () => void;
};

interface ISubmitData {
  [key: string]: any;
}

const Form: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function formSubmit(data: ISubmitData) {
    console.log('submit');
    console.log(data);
    // props.onSubmit && props.onSubmit();
  }

  return (
    <div className={styles['form__wrapper']}>
      <form onSubmit={handleSubmit(formSubmit)}>
        {props.login && (
          <FormInput
            type="text"
            text={t('authForm.inputs.login')}
            name="login"
            register={register}
            errors={errors}
          />
        )}
        {props.name && (
          <FormInput
            type="text"
            text={t('authForm.inputs.name')}
            name="name"
            register={register}
            errors={errors}
          />
        )}
        {props.password && (
          <FormInput
            type="password"
            text={t('authForm.inputs.password')}
            name="password"
            register={register}
            errors={errors}
          />
        )}
        {/* {props.passwordRepeat && (
            <Input type="password">{t('authForm.inputs.passwordRepeat')}</Input>
          )} */}
        <Button type="submit">{props.children}</Button>
        {props.isSignIn && (
          <div>
            {t('loginPage.redirect.text')}
            <span className={styles.span} onClick={() => navigate('/login')}>
              {t('loginPage.redirect.span')}
            </span>
          </div>
        )}
        {props.isSignUp && (
          <div>
            {t('signUpPage.redirect.text')}
            <span className={styles.span} onClick={() => navigate('/signup')}>
              {t('signUpPage.redirect.span')}
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
