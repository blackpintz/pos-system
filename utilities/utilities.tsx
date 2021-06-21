import pluralize from 'pluralize';

export interface order {
    id: string | null,
    orders: any[],
    phoneNumber: string,
    total: number,
    created_at: string,
    completed: boolean,
    completed_time: string,
    paid: boolean
}

export interface orderDetails {
    id: string,
    name: string,
    price: number,
    quantity: number
 }

export const checkQuantity = (quantity: number, item: string) => (
    quantity <= 1 ? `${quantity} ${item}`: `${quantity} ${pluralize(item)}`
)