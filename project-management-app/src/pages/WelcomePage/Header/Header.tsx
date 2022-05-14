import React from 'react';
import Button from '../../../components/Button/Button';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Button type="button" redirect="/login">
        Log In
      </Button>
      <Button type="button" redirect="/signup">
        Sign Up
      </Button>
    </header>
  );
};

export default Header;
