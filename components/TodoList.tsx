import Todo from '../components/Todo';
import { Task } from '../utilities/utilities';

const TodoList = ({tasks}: any) => {
    console.log(tasks)
    return (
        <>
            {tasks.map((task: Task) => (
                <>
                <Todo taskItem={task} key={task.id} />
                </>
            ))}
        </>
    )
}

export default TodoList;