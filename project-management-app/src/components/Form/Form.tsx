import styles from './Form.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { FormInput } from '../FormInput/FormInput';
import { fetchApi } from '../../store/fetchApi';
import {
  setCanLogin,
  setIsLoading,
  setPassword,
  setToken,
  setUser,
} from '../../store/authorizeSlice';
import { useCustomDispatch } from '../../customHooks/customHooks';
import ButtonBlueDark from '../ButtonBlueDark/ButtonBlueDark';

type Props = {
  children: string;
  isSignIn?: boolean;
  isSignUp?: boolean;
  login: boolean;
  name?: boolean;
  password: boolean;
  passwordRepeat?: boolean;
};

export interface ISubmitData {
  [key: string]: any;
}

interface IAuthError {
  data: {
    statusCode: number;
    message: string;
  };
  status: number;
}

const Form: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const [signUp, {}] = fetchApi.useSignUpMutation();
  const [signIn, {}] = fetchApi.useSignInMutation();
  const dispatch = useCustomDispatch();
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  async function formSubmit(data: ISubmitData) {
    if (props.isSignUp) {
      const newUser = {
        name: data.name,
        login: data.login,
        password: data.password,
      };
      try {
        const response = await signUp(newUser).unwrap();
        dispatch(setCanLogin(true));
      } catch (err) {
        setError('login', { message: t('authForm.errors.exist') });
      }
    }

    if (props.isSignIn) {
      const user = {
        login: data.login,
        password: data.password,
      };
      try {
        const response = await signIn(user).unwrap();
        dispatch(setToken(response.token));
        dispatch(setIsLoading(true));
        localStorage.setItem('user', JSON.stringify(response));
      } catch (err) {
        setError('login', { message: t('authForm.errors.wrong') });
        setError('password', { message: t('authForm.errors.wrong') });
      }
    }
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
        <ButtonBlueDark>{props.children}</ButtonBlueDark>
        {props.isSignUp && (
          <div className={styles.question}>
            {t('loginPage.redirect.text')}
            <span className={styles.span} onClick={() => navigate('/login')}>
              {t('loginPage.redirect.span')}
            </span>
          </div>
        )}
        {props.isSignIn && (
          <div className={styles.question}>
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
