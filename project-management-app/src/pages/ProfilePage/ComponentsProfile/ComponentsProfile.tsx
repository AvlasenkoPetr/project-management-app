import { EventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../ComponentsProfile/form-style.scss';
interface data {
  username: string;
  fullname: string;
}

const ComponentsProfile: React.FC = () => {
  const arayTest: data[] = [];
  const [arrayConst, setarrayConst] = useState(arayTest);
  const [check, setCheck] = useState(false);
  const { register, handleSubmit } = useForm();

  function onSubmit(data: any) {
    setarrayConst([...arrayConst, data]);
  }

  function componentMount({ target: { checked } }: any) {
    setCheck(checked);
  }

  function OnDisable() {
    if (check) {
      return (
        <button className="form-main__input-btn" type="submit">
          Submit
        </button>
      );
    } else
      return (
        <button className="form-main__input-btn-disable" type="reset">
          Reset
        </button>
      );
  }

  return (
    <div className="form-main">
      <div className="form-main__input-container">
        <label className="form-main__label-content" htmlFor="scales">
          I agree
        </label>
        <input
          {...register('scales')}
          required
          className="form-main__input-checkbox"
          type="checkbox"
          id="scales"
          checked={check}
          onChange={componentMount}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-main__container">
          <div className="form-main__input-content">
            <label className="form-main__label-input">
              name:
              <input
                required
                className="form-main__input-text"
                type="text"
                defaultValue={'values1.text'}
                {...register('username')}
                placeholder="Username"
              />
            </label>
            <label className="form-main__label-input">
              full name:
              <input
                required
                className="form-main__input-text"
                type="text"
                defaultValue={'values2.text2'}
                {...register('fullname')}
                placeholder="Full name"
              />
            </label>
            <label className="form-main__label-input">
              password:
              <input
                required
                className="form-main__input-text"
                type="password"
                {...register('password')}
                placeholder="password"
              />
            </label>
          </div>

          <OnDisable />
        </div>
      </form>
    </div>
  );
};

export default ComponentsProfile;
