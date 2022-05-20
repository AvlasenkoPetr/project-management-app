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

const ComponentsProfile: React.FC = () => {
  const arayTest: data[] = [];
  const [arrayConst, setarrayConst] = useState(arayTest);
  const [statusToken, setStatusToken] = useState<any>([]);

  const [statusRegistration, setStatusRegistration] = useState(
    'Введите пароль для подтверждения пользователь'
  );
  const [statusConfirmation, setStatusConfirmation] = useState(false);

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
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm({
    mode: 'onChange',
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
      console.log(rawResponse.status);
      setStatusRegistration(`Пользователь успешно изменён`);
    } else {
      console.log('error', rawResponse.status);
    }
    // const content = await rawResponse.json();
    // console.log(content);
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

  function IsDisabled() {
    if (isValid) {
      return (
        <button className="form-main__input-btn" type="submit">
          Submit
        </button>
      );
    } else {
      return <div className="form-main__input-btn-disable">Submit</div>;
    }
  }

  function CreateUser() {
    return (
      <div>
        <label className="form-main__label-input">
          Login:
          <input
            className="form-main__input-text"
            type="text"
            defaultValue={statusToken.login}
            {...register('login', {
              required: 'Поля обязательно к заполнению',
              minLength: {
                value: 4,
                message: 'минимум 4 символa',
              },
            })}
            placeholder="Login"
          />
        </label>
        <div style={{ color: 'red' }}>
          {errors?.login && <p>{errors?.login?.message || 'Error'}</p>}
        </div>
        <label className="form-main__label-input">
          Name:
          <input
            className="form-main__input-text"
            type="text"
            defaultValue={statusToken.name}
            {...register('name', {
              required: 'Поля обязательно к заполнению',
              minLength: {
                value: 4,
                message: 'минимум 4 символa',
              },
            })}
            placeholder="Name"
          />
        </label>
        <div style={{ color: 'red' }}>
          {errors?.name && <p>{errors?.name?.message || 'Error'}</p>}
        </div>
        <label className="form-main__label-input">
          New pass:
          <input
            className="form-main__input-text"
            type="password"
            {...register('passwordNew', {
              required: 'Поля обязательно к заполнению',
              minLength: {
                value: 4,
                message: 'минимум 4 символa',
              },
            })}
          />
        </label>
        <div style={{ color: 'red' }}>
          {errors?.passwordNew && <p>{errors?.passwordNew?.message || 'Error'}</p>}
        </div>
      </div>
    );
  }

  function AuthorizationUser() {
    return (
      <div>
        <label className="form-main__label-input">
          Password:
          <input
            className="form-main__input-text"
            type="password"
            {...register('password', {
              required: 'Поля обязательно к заполнению',
              minLength: {
                value: 4,
                message: 'минимум 4 символa',
              },
            })}
            placeholder="Подтвердите пользователя"
          />
        </label>
        <div style={{ color: 'red' }}>
          {errors?.password && <p>{errors?.password?.message || errors}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="form-main">
      <p style={{ color: 'blue' }}>{statusRegistration}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-main__container">
          <div className="form-main__input-content">
            {statusConfirmation == false ? <AuthorizationUser /> : <CreateUser />}
          </div>
        </div>
        <button className="form-main__input-btn" type="submit">
          Submit
        </button>
      </form>
      <br />
      <button
        style={statusConfirmation == false ? { display: 'none' } : { display: 'block' }}
        className="form-main__input-btn"
        onClick={onDelete}
      >
        <p>Delete acaunt</p>
      </button>
      {/* <FormInput login password /> */}
    </div>
  );
};

export default ComponentsProfile;
