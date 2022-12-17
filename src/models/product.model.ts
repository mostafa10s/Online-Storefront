import Prow from '../types/product.db'
import db from '../database'
class product {
  async create_product(p: Prow): Promise<Prow> {
    try {
      const con = await db.connect()
      const sql = `INSERT INTO product ( product_name,product_price )   
      VALUES ($1, $2) returning  product_id, product_name,product_price `
      const result = await con.query(sql, [p.product_name, p.product_price])
      con.release()

      return result.rows[0]
    } catch (error) {
      console.log(error)
      throw new Error('your product did not create please try again')
    }
  }
  async getAll(): Promise<Prow[]> {
    try {
      const con = await db.connect()
      const sql = `SELECT  product_id, product_name,product_price FROM product `
      const result = await con.query(sql)
      con.release()
      return result.rows
    } catch (error) {
      throw new Error('your product did not create please try again')
    }
  }
  async getOne(id: number): Promise<Prow> {
    try {
      const con = await db.connect()
      const sql = `SELECT  product_id, product_name,product_price FROM product where product_id=$1 `
      const result = await con.query(sql, [id])
      con.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('your product did not create please try again')
    }
  }
  async update_product(p: Prow, id: number): Promise<Prow> {
    try {
      const con = await db.connect()
      const sql = `UPDATE product SET product_name=$1,product_price=$2
      WHERE product_id=$3 returning  product_id, product_name, product_price `
      const result = await con.query(sql, [p.product_name, p.product_price, id])
      con.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('your product did not create please try again')
    }
  }
  async delete_product(id: number): Promise<void> {
    try {
      const con = await db.connect()
      const sql = `DELETE FROM product WHERE product_id=($1)`
      await con.query(sql, [id])
      con.release()
    } catch (error) {
      console.log(error)
      throw new Error('your product did not create please try again')
    }
  }
}
export default product
