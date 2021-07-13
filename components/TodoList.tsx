import Todo from '../components/Todo';
import { Task } from '../utilities/utilities';

const TodoList = ({tasks}: any) => {
    return (
        <>
            {tasks.map((task: Task) => (
                <Todo taskItem={task} key={task.id} />
            ))}
        </>
    )
}

export default TodoList;