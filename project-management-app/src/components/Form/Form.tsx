import React from 'react';
import styles from './Form.module.scss';
import Input from './Input/Input';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

const Form: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  async function FormSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    props.onSubmit && props.onSubmit();
  }

  return (
    <div className={styles.container}>
      <div className={styles['form__wrapper']}>
        <form onSubmit={FormSubmit}>
          {props.login && <Input type="text">{t('authForm.inputs.login')}</Input>}
          {props.name && <Input type="text">{t('authForm.inputs.name')}</Input>}
          {props.password && <Input type="password">{t('authForm.inputs.password')}</Input>}
          {props.passwordRepeat && (
            <Input type="password">{t('authForm.inputs.passwordRepeat')}</Input>
          )}
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
    </div>
  );
};

export default Form;
