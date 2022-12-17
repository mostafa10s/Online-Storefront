import { Pool, PoolConfig } from 'pg'
import config from '../config'
let poolConfig: PoolConfig | null = null

if (config.env === 'dev') {
  poolConfig = {
    host: config.host,
    database: config.db_postgres,
    password: config.password,
    user: config.user,
    port: parseInt(config.DB_Port as string)
  }
}

if (config.env === 'test') {
  poolConfig = {
    host: config.host,
    database: config.db_postgres_test,
    password: config.password,
    user: config.user,
    port: parseInt(config.DB_Port as string)
  }
}
if (!poolConfig) {
  throw new Error(
    `poolConfig is null please check your database connection configurations ${JSON.stringify(
      config
    )}`
  )
}
const pool = new Pool(poolConfig)
export default pool
