import db from '../database/index'
import config from '../config'
import bcrypt from 'bcrypt'
const hashPassword = (password: string) => {
  const slat = parseInt(config.slat as string, 8)
  return bcrypt.hashSync(`${password}${config.pepper}`, slat)
}
class userCrud {
  //create
  async create(u: users): Promise<users> {
    try {
      //conct with database
      const con = await db.connect()
      // sql syntaxconst

      const sql = `INSERT INTO users ( last_name, first_name, passworde, user_name)
         VALUES ($1, $2, $3, $4) returning  user_id, last_name,first_name, user_name `
      const result = await con.query(sql, [
        u.last_name,
        u.first_name,
        hashPassword(u.passworde),
        u.user_name
      ])
      con.release()
      return result.rows[0]

      //close database
    } catch (error) {
      throw new Error('unable to SelectAll Users please ty again later')
    }
  }

  async selectData(): Promise<users[]> {
    try {
      //conct with database
      const con = await db.connect()
      // sql syntax
      const sql = `SELECT user_id, last_name, first_name, user_name  from users `
      const result = await con.query(sql)
      //close database
      con.release()
      return result.rows
    } catch (error) {
      console.log(error)
      throw new Error('unable to SelectAll Users please ty again later' + error)
    }
  }
  async selectOne(user_name: string): Promise<users> {
    try {
      //conct with database
      const con = await db.connect()
      // sql syntax
      const sql = `SELECT user_id, last_name, first_name, user_name from users where user_name=($1)  `
      const result = await con.query(sql, [user_name])
      //close database
      con.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('unable to select ueser please ty again later')
    }
  }
  // update
  async UpdatInfo(u: users, user_id: number): Promise<users> {
    try {
      //conct with database
      const con = await db.connect()
      // sql syntax
      const sql = `UPDATE users SET  last_name =$1, first_name =$2, passworde=$3, user_name =$4 
      WHERE  user_id=$5 returning  user_id, last_name , first_name ,user_name `
      const result = await con.query(sql, [
        u.last_name,
        u.first_name,
        hashPassword(u.passworde),
        u.user_name,
        user_id
      ])

      //close database
      con.release()
      return result.rows[0]
    } catch (error) {
      console.error(error)
      throw new Error('unable to Update data please ty again later' + error)
    }
  }
  // delete

  async backPassword(name: string, pas: string): Promise<users | null> {
    try {
      const con = await db.connect()
      const sql = 'SELECT  passworde from users WHERE user_name=($1)'
      const result = await con.query(sql, [name])
      if (result.rows.length) {
        const { passworde: hashPassword } = result.rows[0]
        const passwordisvaldit = bcrypt.compareSync(`${pas}${config.pepper}`, hashPassword)
        if (passwordisvaldit) {
          const userInfo = await con.query(
            'SELECT user_id, last_name, first_name from users where user_name=($1)',
            [name]
          )
          return userInfo.rows[0]
        }
      }
      con.release()
      return null
    } catch (error) {
      throw new Error(`what kind of error you have: ${(error as Error).message}`)
    }
  }
}
export default userCrud
