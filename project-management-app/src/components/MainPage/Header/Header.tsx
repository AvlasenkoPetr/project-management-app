import React from 'react';
import Button from '../../Button/Button';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Button>Edit Profile</Button>
      <Button>Create board</Button>
      <Button>En/Ru</Button>
      <Button danger>Logout</Button>
    </header>
  );
};

export default Header;
