import { t } from 'i18next';
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
  [key: string]: any;
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

const ComponentsProfile: React.FC<Props> = (props) => {
  const arayTest: data[] = [];
  const [arrayConst, setarrayConst] = useState(arayTest);
  const [statusToken, setStatusToken] = useState<any>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const [statusRegistration, setStatusRegistration] = useState(
    'Введите пароль для подтверждения пользователь'
  );
  const [statusConfirmation, setStatusConfirmation] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);

  const dispatch = useCustomDispatch();
  const { refetch } = fetchApi.useGetAllBoardsQuery('');
  const navigate = useNavigate();
  const [signIn, {}] = fetchApi.useSignInMutation();

  const getLocal = JSON.parse(localStorage.getItem('user') || '');
  const decoded = jwt_decode(getLocal.token) as any;
  const keyToken = getLocal.token;
  const keyUserId = decoded.userId;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: 'onBlur',
  });

  async function getUser() {
    const rawResponse = await fetch(`https://boiling-dusk-69324.herokuapp.com/users/${keyUserId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${keyToken}`,
        Accept: 'application/json',
      },
    });
    setStatusToken(await rawResponse.json());
  }

  useEffect(() => {
    getUser();
  }, []);
  async function onDelete() {
    const rawResponse = await fetch(`https://boiling-dusk-69324.herokuapp.com/users/${keyUserId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${keyToken}`,
        Accept: '*/*',
      },
    });
    if (rawResponse.ok) {
      console.log(rawResponse.status);
      localStorage.removeItem('user');
      dispatch(logOut());
      refetch();
      navigate('/login');
    } else {
      console.log('error', rawResponse.status);
    }
  }

  async function checkUser(user: Iuser) {
    const userTest = {
      login: statusToken.login,
      password: user.password,
    };
    try {
      const response = await signIn(userTest).unwrap();
      dispatch(setToken(response.token));
      dispatch(setIsLoading(true));
      localStorage.setItem('user', JSON.stringify(response));
      setStatusRegistration(`Tекущий пользователь`);
      setStatusConfirmation(true);
    } catch (err) {
      setStatusRegistration(`Неправильный пароль`);
    }
  }

  async function updateUser(user: Iuser) {
    const rawResponse = await fetch(`https://boiling-dusk-69324.herokuapp.com/users/${keyUserId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${keyToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (rawResponse.ok) {
      setStatusRegistration(`Пользователь успешно изменён`);
    } else {
      console.log('error', rawResponse.status);
      setStatusRegistration(`Internal Server Error`);
    }
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
      <div>
        <FormInput
          type="text"
          text={t('authForm.inputs.login')}
          name="login"
          register={register}
          errors={errors}
          defaultValue={statusToken.login}
        ></FormInput>
        <FormInput
          type="text"
          text={t('authForm.inputs.name')}
          name="name"
          register={register}
          errors={errors}
          defaultValue={statusToken.name}
        ></FormInput>
        <div className="form-main__input-container">
          <label className="form-main__label-content" htmlFor="scales">
            Изменить пароль
          </label>
          <input
            type="checkbox"
            className="form-main__input-checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            id="scales"
          />
        </div>

        <div>
          {checked ? (
            <FormInput
              type="password"
              text={t('authForm.inputs.password')}
              name="passwordNew"
              register={register}
              errors={errors}
            ></FormInput>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }

  function AuthorizationUser() {
    return (
      <div>
        <FormInput
          type="password"
          text={t('authForm.inputs.password')}
          name="password"
          register={register}
          errors={errors}
        ></FormInput>
      </div>
    );
  }

  const openModal = () => {
    // dispatch(setIsModalHide(false));
    setOpen(true);
  };

  const closeModal = () => {
    // dispatch(setIsModalHide(true));
    setOpen(false);
  };

  return (
    <div className="form-main">
      <p className="form-main__attention" style={{ color: 'blue' }}>
        {statusRegistration}
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-main__container">
          <div className="form-main__input-content">
            {statusConfirmation == false ? <AuthorizationUser /> : <ChangeUser />}
          </div>
        </div>
        <button className="form-main__input-btn" type="submit">
          Submit
        </button>
      </form>
      <button
        style={statusConfirmation == false ? { display: 'none' } : { display: 'block' }}
        className="form-main__input-btn"
        onClick={openModal}
      >
        <p className="form-main__attention">Delete acaunt</p>
      </button>
      <Modal
        title={t('Are you sure')}
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
