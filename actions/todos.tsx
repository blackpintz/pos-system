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
    day: ''
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
                    Tasks.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    })
                dispatch(fetchTaskData(Tasks))
            })
        })
    )
)


