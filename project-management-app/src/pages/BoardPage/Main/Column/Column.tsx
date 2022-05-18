import styles from './Column.module.scss';
import ColumnHeader from './Header/ColumnHeader';

type Props = {
  key: string;
  id: string;
  order: number;
  title: string;
};

const Column: React.FC<Props> = (props) => {
  return (
    <div className={styles.column} key={props.id}>
      <ColumnHeader title={props.title} order={props.order} id={props.id} />
    </div>
  );
};

export default Column;
