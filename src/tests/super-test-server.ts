import srvr from '../server'
import supertest from 'supertest'

export const server = supertest(srvr)
export const getTestUser = async () => {
  const res = await server
    .post('/api/users/login')
    .send({ user_name: 'admin', passworde: '123456789' })
  return `Bearer ${res.body.token}`
}
