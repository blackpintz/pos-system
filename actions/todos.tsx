import database from '../firebase/firebase';

interface Task {
    id: string | null,
    task: string,
    completed: boolean,
    created_at: string,
    displayTime: string
}

interface TaskNoID {
    task: string,
    completed: boolean,
    created_at: string,
    displayTime: string
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