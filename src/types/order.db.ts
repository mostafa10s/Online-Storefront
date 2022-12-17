import { type } from 'os'
type Order = {
  id?: number
  user_id: number
  order_statues: string
}
export default Order

export type OrderDetails = {
  id: number
  user_id: number
  order_statues: string
  fullname: string
  products: {
    order_id: number
    product_id: number
    quantity: number
    product_name: string
    product_price: string
  }[]
}
