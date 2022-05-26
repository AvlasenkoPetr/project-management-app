import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import styles from './Task.module.scss';

type Props = {
  title: string;
  id: string;
  index: number;
};
const Task: React.FC<Props> = (props) => {
  return (
    <Draggable draggableId={props.id} index={props.index}>
      {(provided: DraggableProvided) => {
        return (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            className={styles.task}
          >
            {props.title}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Task;
