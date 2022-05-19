import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/styles/App.scss';
import { useCustomDispatch, useCustomSelector } from './customHooks/customHooks';
import BoardPage from './pages/BoardPage/BoardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import { setToken } from './store/authorizeSlice';
import { toggleLanguage } from './store/mainPageSlice';
import i18n from './utilits/i18n';

type localStorageType = {
  token: string;
};

const App: React.FC = () => {
  const selector = useCustomSelector((state) => state);
  const dispatch = useCustomDispatch();
  const token: localStorageType = JSON.parse(localStorage.getItem('user') as string);
  const lang = localStorage.getItem('lang') as 'ru' | 'en';
  if (lang) dispatch(toggleLanguage(lang));
  if (token) dispatch(setToken(token.token));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/editprofile" element={<ProfilePage />} />
        <Route path="/board" element={<BoardPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
