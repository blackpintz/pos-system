import database from '../firebase/firebase'

const addMenuItem=(item: {id: string | null, name: string, price: number, category: string, created_at: string}) => ({
    type: "ADD_ITEM",
    item
})

export const addMenuItemToDB = (itemData: {name: string, price: number, category: string, created_at: string}) => (
    (dispatch: any) => (
        database.ref('VeganMenu').push(itemData).then((ref) => {
            dispatch(addMenuItem({
                id: ref.key,
                ...itemData
            }))
        })
    )
)

const fetchMenu = (menu: [{id: string | null, name: string, price: number, category: string, created_at: string}]) => ({
    type: "FETCH_MENU",
    menu
})

export const getMenufromDB = () => (
    (dispatch: any) => (
        database.ref('VeganMenu').once('value').then((snapshot) => {
            const Menu: [{id: string | null, name: string, price: number, category: string, created_at: string}] = [{id: '', name: '', price: 0, category: '', created_at: ''}]
            snapshot.forEach((childSnapshot) => {
                Menu.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
                dispatch(fetchMenu(Menu))
            })
        })
    )
)