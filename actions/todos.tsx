import moment from 'moment';
import database from '../firebase/firebase';
import {Task, TaskNoID} from '../utilities/utilities';


interface WeekDate {
    id: string | null,
    date: string
}

const addTask = (item: Task) => ({
    type: "ADD_TASK",
    item
})

const initial = {
    id: '',
    task: '',
    completed: false,
    created_at: '',
    displayTime: '',
    date: '',
    day: '',
    completed_at: '',
    added: false
}

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

export const addDateToDB = (date: string) => (
    database.ref('VeganTodoManager').child('Dates').set({
        date: moment(date).add(7, 'days').format('LL')
    })
)

const updateTask = (child: string, id: string | null, updates: Task) => ({
    type: "UPDATE_TASK",
    child,
    id,
    updates
})

export const updateTaskToDB = (child: string, id: string | null, updates: Task) => (
    (dispatch: any) => (
        database.ref('VeganTodoManager').child(`${child}/${id}`).update(updates).then(() => {
            dispatch(updateTask(child, id, updates))
        })
    )
)

const fetchStartDate = (date: WeekDate) => ({
    type: "FETCH_DATE",
    date
})

export const fetchDateFromDB = () => (
    (dispatch: any) => (
        database.ref('VeganTodoManager').child('Dates').on('value', (snapshot) => {
            dispatch(fetchStartDate(snapshot.val()))
        })
    )
)

const fetchTaskData = (taskData: [Task]) => ({
    type: "FETCH_TASK_DATA",
    taskData
})

export const fetchTasksFromDB = (child: string) => (
    (dispatch: any) => (
        database.ref('VeganTodoManager').child(child).on('value', (snapshot) => {
            const Tasks: [Task] = [initial]
            snapshot.forEach((childSnapshot) => {
                if(!childSnapshot.val().completed) {
                    Tasks.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    })
                }
                dispatch(fetchTaskData(Tasks))
            })
        })
    )
)

const fetchCompleteTasks = (taskData: [Task]) => ({
    type: 'FETCH_COMPLETE_TASKS',
    taskData
})

export const fetchCompleteTasksFromDB = (child: string) => (
    (dispatch: any) => (
        database.ref('VeganTodoManager').child(child).on('value', (snapshot) => {
            const Tasks: [Task] = [initial]
            snapshot.forEach((childSnapshot) => {
                if(childSnapshot.val().completed) {
                    Tasks.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    })
                }
                dispatch(fetchCompleteTasks(Tasks))
            })
        })
    )
)


