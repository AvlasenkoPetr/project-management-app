import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import '../ProfilePage/ProfilePageStyle.scss';
import ComponentsProfile from './ComponentsProfile/ComponentsProfile';

const ProfilePage: React.FC = () => {
  const navigation = useNavigate();

  const returnToMainPage = () => {
    navigation('/');
  };

  return (
    <div className="profile-page">
      <div className="container">
        <Header />
        <div className="profile-page__content">
          <button className="profile-page__button" onClick={returnToMainPage} type="button">
            Return
          </button>
          <ComponentsProfile />
        </div>

        <Footer />
      </div>
    </div>
  );
};
export default ProfilePage;
