import pluralize from 'pluralize';

export interface order {
    id: string | null,
    orders: any[],
    phoneNumber: string,
    total: number,
    created_at: string,
    completed: boolean,
    completed_time: string,
    paid: boolean,
    name: string,
    instruction: string,
    deleted: boolean
}

export interface orderDetails {
    id: string,
    name: string,
    price: number,
    quantity: number
 }

 export interface deletedOrderNoID {
     order: order,
     deleted_at: string,
     reason: string
 }

 export interface deletedOrder {
    id: string | null,
    order: order,
    deleted_at: string,
    reason: string
}

export const checkQuantity = (quantity: number, item: string) => {
    const str = item.replace(/ *\([^)]*\) */g, "")
    return quantity <= 1 ? `${quantity} ${str}`: `${quantity} ${pluralize(str)}`
}