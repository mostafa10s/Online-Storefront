import Order, { OrderDetails } from '../types/order.db'
import order_prodacts from '../types/order.product.db'
import db from '../database'
//id?: number
//user_id: number
//order_statues: string

class OrderModel {
  async create_order(item: { id: number; quantity: number }[], userId: number): Promise<Order> {
    try {
      const con = await db.connect()
      const sql = `INSERT INTO orders ( order_statues, user_id)   
        VALUES ($1,$2) returning id,order_statues,user_id `
      const result = await con.query(sql, ['Active', userId])
      const orderId = result.rows[0].id
      for (let i = 0; i < item.length; i++) {
        const productItems = item[i]
        const insert =
          ' INSERT INTO  order_prodacts ( order_id,product_id,quantity)VALUES ($1,$2,$3) '
        const result = await con.query(insert, [orderId, productItems.id, productItems.quantity])
      }
      con.release()
      return result.rows[0]
    } catch (error: any) {
      throw new Error('your order did not created please try again')
    }
  }
  async getAll(): Promise<Order[]> {
    try {
      const con = await db.connect()
      const sql = `SELECT  id, user_id ,order_statues  FROM orders  `
      const result = await con.query(sql)
      con.release()
      return result.rows
    } catch (error) {
      throw new Error('your order did not selected please try again')
    }
  }
  async getOne(id: number): Promise<OrderDetails | null> {
    try {
      const con = await db.connect()
      const sql = `SELECT  id, orders.user_id ,order_statues, concat(first_name,'  ',last_name)  as fullname FROM orders INNER JOIN users ON orders.user_id= users.user_id
      where id=$1
      `
      const result = await con.query(sql, [id])
      if (result.rows.length) {
        const dataOrder = await con.query(
          `SELECT  order_id,order_prodacts.product_id, quantity, product_name,product_price
          FROM public.order_prodacts 
          INNER JOIN product ON order_prodacts.product_id= product.product_id where order_id=$1`,
          [id]
        )
        const productdata = dataOrder.rows
        result.rows[0].products = productdata
        const orderdata = result.rows[0]
        return orderdata
      }
      con.release()
      return null
    } catch (error) {
      throw new Error('your order did not selected please try again')
    }
  }
  async update_order(
    item: { id: number; quantity: number }[],
    o: Order,
    id: number
  ): Promise<Order> {
    try {
      const con = await db.connect()
      const sql = `UPDATE orders SET order_statues=$1  WHERE id=$2  `
      const result = await con.query(sql, [o.order_statues, id])
      const deleteOrderProduct = `DELETE FROM  order_prodacts WHERE order_id=($1)`
      await con.query(deleteOrderProduct, [id])
      for (let i = 0; i < item.length; i++) {
        const productItems = item[i]
        const insertOrderProduct = `INSERT INTO  order_prodacts ( order_id,product_id,quantity)   
      VALUES ($1,$2,$3) returning id,product_id,order_id,quantity `

        const result = await con.query(insertOrderProduct, [
          id,
          productItems.id,
          productItems.quantity
        ])
      }

      con.release()

      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  async delete_order(id: number): Promise<void> {
    try {
      const con = await db.connect()
      const deleteOrderProduct = `DELETE FROM  order_prodacts WHERE order_id=($1)`
      await con.query(deleteOrderProduct, [id])
      const sql = `DELETE FROM orders WHERE id=($1)`
      await con.query(sql, [id])

      con.release()
    } catch (error) {
      console.log(error)
      throw new Error('your order did not deleted please try again')
    }
  }
  async addNewProduct(id: number, product_id: number, quantity: number): Promise<order_prodacts> {
    try {
      const con = await db.connect()
      const insertOrderProduct = `INSERT INTO  order_prodacts ( order_id,product_id,quantity)   
      VALUES ($1,$2,$3) returning id,product_id,order_id,quantity `
      const result = await con.query(insertOrderProduct, [id, product_id, quantity])
      con.release()
      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw new Error('your product did not send to database and retuning null')
    }
  }
}

export default OrderModel
