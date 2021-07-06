import database from '../firebase/firebase';

interface Task {
    id: string | null,
    task: string,
    completed: boolean,
    created_at: string
}

interface TaskNoID {
    task: string,
    completed: boolean,
    created_at: string
}

const addTask = (item: Task) => ({
    type: "ADD_TASK",
    item
})

export const addTaskToDB = (child: string, itemData: TaskNoID) => (
    (dispatch: any) => (
        database.ref('VeganTodoManager').child(child).push(itemData).then((ref) => {
            dispatch(addTask({
                id: ref.key,
                ...itemData
            }))
        })
    )
)