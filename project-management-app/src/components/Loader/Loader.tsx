import loader from '../../assets/img/giphy.gif';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles['loader']}>
      <img src={loader} alt="" />
    </div>
  );
};
