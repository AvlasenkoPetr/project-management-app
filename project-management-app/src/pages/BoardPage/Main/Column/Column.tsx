import styles from './Column.module.scss';
import ColumnHeader from './Header/ColumnHeader';

import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import ColumnBody from './Body/Body';
import { TaskType } from '../../../../store/fetchApiTypes';

type Props = {
  key: string;
  index: number;
  id: string;
  order: number;
  title: string;
  tasks: TaskType[];
};

const Column: React.FC<Props> = (props) => {
  return (
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided: DraggableProvided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className={styles.column} key={props.id}>
            <ColumnHeader title={props.title} order={props.order} id={props.id} />
            <ColumnBody tasks={props.tasks} id={props.id} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
