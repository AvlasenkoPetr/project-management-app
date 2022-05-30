import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { ReturnButton } from '../../components/ReturnButton/ReturnButton';
import { useCustomDispatch, useCustomSelector } from '../../customHooks/customHooks';
import { fetchApi } from '../../store/fetchApi';
import '../ProfilePage/ProfilePageStyle.scss';
import ComponentsProfile from './ComponentsProfile/ComponentsProfile';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user')) navigate('/');
  }, [localStorage.getItem('user')]);

  return (
    <div className="profile-page">
      <div className="container">
        <Header />
        <div className="profile-page__content">
          <ReturnButton />
          {localStorage.getItem('user') && <ComponentsProfile />}
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default ProfilePage;
