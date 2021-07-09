import moment from 'moment';
import database from '../firebase/firebase';

interface Task {
    id: string | null,
    task: string,
    completed: boolean,
    created_at: string,
    displayTime: string,
    date: string,
    day: string
}

export interface TaskNoID {
    task: string,
    completed: boolean,
    created_at: string,
    displayTime: string,
    date: string,
    day: string
}

interface WeekDate {
    id: string | null,
    date: string
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
