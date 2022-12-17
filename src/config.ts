import dotenv from 'dotenv'

dotenv.config()
const {
  PORT,
  Postgres_host,
  Postgres_Port,
  Postgres_user,
  Postgres_password,
  Postgres_database,
  Postgres_test_database,
  Bcrypt_pass,
  Slart_BETTWEN,
  Token_secret,
  Node_Env
} = process.env
export default {
  port: PORT,
  host: Postgres_host,
  db_postgres: Postgres_database,
  db_postgres_test: Postgres_test_database,
  password: Postgres_password,
  DB_Port: Postgres_Port,
  user: Postgres_user,
  pepper: Bcrypt_pass,
  slat: Slart_BETTWEN,
  tokenSecret: Token_secret,
  env: Node_Env
}
