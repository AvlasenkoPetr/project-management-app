import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCustomDispatch } from '../../../customHooks/customHooks';
import { logOut, setIsLoading, setToken } from '../../../store/authorizeSlice';
import { fetchApi } from '../../../store/fetchApi';
import '../ComponentsProfile/form-style.scss';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { FormInput } from '../../../components/FormInput/FormInput';
import { Modal } from '../../../components/Modal/Modal';
import { useTranslation } from 'react-i18next';

type Props = {
  children?: string;
  isSignIn?: boolean;
  isSignUp?: boolean;
  login?: boolean;
  name?: boolean;
  password?: boolean;
};

interface data {
  login?: string | undefined;
  name?: string | undefined;
  password?: string | undefined;
  passwordNew?: string | undefined;
}

interface ISubmitData {
  [key: string]: string;
}
interface Iuser {
  name: string;
  login: string;
  password: string;
}

interface IarayDecoded {
  name: string;
  login: string;
}

type decodedType = {
  userId: string;
  login: string;
  iat: number;
};

type statusTokenType = {
  id: readonly string[];
  login: readonly string[];
  name: readonly string[];
};

const ComponentsProfile: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const arayTest: data[] = [];
  const [isDataChanged, setDataChanged] = useState<boolean>(false);
  const [isDataChangedHide, setDataChangedHide] = useState<boolean>(true);
  const [arrayConst, setarrayConst] = useState(arayTest);
  const [statusToken, setStatusToken] = useState<statusTokenType>({
    id: [''],
    login: [''],
    name: [''],
  });
  const [checked, setChecked] = useState<boolean>(false);
  const [userVerified, setUserVerified] = useState<boolean>(false);
  const [statusConfirmation, setStatusConfirmation] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);

  const dispatch = useCustomDispatch();
  const { refetch } = fetchApi.useGetAllBoardsQuery('');
  const navigate = useNavigate();
  const [signIn, {}] = fetchApi.useSignInMutation();

  const [signIn, { error: customError }] = fetchApi.useSignInMutation();
  const getLocal = JSON.parse(localStorage.getItem('user') || '');
  const decoded: decodedType = jwt_decode(getLocal.token);
  const keyToken = getLocal.token;
  const keyUserId = decoded.userId;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    reValidateMode: 'onBlur',
  });

  async function getUser() {
    const rawResponse = await fetch(
      `https://powerful-tundra-27687.herokuapp.com/users/${keyUserId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${keyToken}`,
          Accept: 'application/json',
        },
      }
    );
    setStatusToken(await rawResponse.json());
  }

  useEffect(() => {
    getUser();
  }, []);

  async function onDelete() {
    const rawResponse = await fetch(
      `https://powerful-tundra-27687.herokuapp.com/users/${keyUserId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${keyToken}`,
          Accept: '*/*',
        },
      }
    );
    if (rawResponse.ok) {
      localStorage.removeItem('user');
      dispatch(logOut());
      refetch();
      navigate('/login');
    } else {
    }
  }

  async function checkUser(user: Iuser) {
    const userTest = {
      login: [statusToken.login].join(''),
      password: user.password,
    };
    try {
      const response = await signIn(userTest).unwrap();
      dispatch(setToken(response.token));
      dispatch(setIsLoading(true));
      localStorage.setItem('user', JSON.stringify(response));
      setUserVerified(true);
      setStatusConfirmation(true);
    } catch (err) {
      setError('password', { message: t('authForm.errors.wrong'), type: 'wrongPassword' });
    }
  }

  async function updateUser(user: Iuser) {
    const rawResponse = await fetch(
      `https://powerful-tundra-27687.herokuapp.com/users/${keyUserId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${keyToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );
    if (rawResponse.ok) {
      setDataChanged(true);
      setDataChangedHide(false);
    } else {
      setDataChanged(false);
      setDataChangedHide(false);
    }

    setTimeout(() => {
      setDataChangedHide(true);
    }, 5000);
  }

  async function onSubmit(data: ISubmitData) {
    setarrayConst([...arrayConst, data]);
    const upUser = {
      name: data.name,
      login: data.login,
      password: data.passwordNew || data.password,
    };
    statusConfirmation == false ? checkUser(upUser) : updateUser(upUser);
  }

  function ChangeUser() {
    return (
      <>
        <FormInput
          type="text"
          text={t('authForm.inputs.login')}
          name="login"
          register={register}
          errors={errors}
          defaultValue={statusToken.login}
          max={16}
        ></FormInput>
        <FormInput
          type="text"
          text={t('authForm.inputs.name')}
          name="name"
          register={register}
          errors={errors}
          defaultValue={statusToken.name}
          max={16}
        ></FormInput>
        <div className="form-main__input-container">
          <label className="form-main__input-container" htmlFor="scales">
            {t('editPage.buttons.changePassword')}
          </label>
          <input
            type="checkbox"
            className="form-main__input-checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            id="scales"
          />
        </div>
        {checked && (
          <FormInput
            type="password"
            text={t('authForm.inputs.password')}
            name="passwordNew"
            register={register}
            errors={errors}
            max={16}
            min={8}
          ></FormInput>
        )}
      </>
    );
  }

  function AuthorizationUser() {
    return (
      <FormInput
        type="password"
        text={t('authForm.inputs.password')}
        name="password"
        register={register}
        errors={errors}
        max={16}
        min={8}
      ></FormInput>
    );
  }

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="form-main">
      <p className="form-main__attention">
        {userVerified ? t('editPage.titles.currentUser') : t('editPage.titles.enterPassword')}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {statusConfirmation == false ? <AuthorizationUser /> : <ChangeUser />}
        <button className="form-main__input-btn" type="submit">
          {t('editPage.buttons.submit')}
        </button>
        <div className={isDataChangedHide ? 'response__message_hide' : 'response__message_show'}>
          {isDataChanged ? t('other.responseStatusDone') : t('other.responseStatusReject')}
        </div>
        <div
          style={statusConfirmation == false ? { display: 'none' } : { display: 'block' }}
          className="form-main__input-btn form-main__delete-btn"
          onClick={openModal}
        >
          {t('editPage.buttons.delete')}
        </div>
      </form>
      <Modal
        title={t('editPage.titles.deleteModal')}
        submitText={t('modals.buttons.deleteBoard')}
        onSubmit={onDelete}
        closeModal={closeModal}
        isOpen={isOpen}
      >
        <h4>irretrievable account deletion</h4>
      </Modal>
    </div>
  );
};

export default ComponentsProfile;
