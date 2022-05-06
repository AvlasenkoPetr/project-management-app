import React from 'react';
import Button from '../../Button/Button';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Button type="button">Edit Profile</Button>
      <Button type="button">Create board</Button>
      <Button type="button">En/Ru</Button>
      <Button type="button" danger>
        Logout
      </Button>
    </header>
  );
};

export default Header;
