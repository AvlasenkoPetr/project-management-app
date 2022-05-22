import styles from './Column.module.scss';
import ColumnHeader from './Header/ColumnHeader';

import { Draggable, DraggableProvided } from 'react-beautiful-dnd';

type Props = {
  key: string;
  index: number;
  id: string;
  order: number;
  title: string;
};

const Column: React.FC<Props> = (props) => {
  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided: DraggableProvided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className={styles.column} key={props.id}>
            <ColumnHeader title={props.title} order={props.order} id={props.id} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
