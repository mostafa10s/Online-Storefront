import { server, getTestUser } from './super-test-server'

describe('users api', () => {
  const routePath = '/api/users'
  let token: string
  describe('[create] endpoint', () => {
    it('Should create new User', async () => {
      const res = await server.post(routePath).send({
        user_name: 'Admin',
        passworde: '123456789',
        first_name: 'Admin',
        last_name: 'Admin'
      })

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('success')
    })
  })
  describe('[login] endpoint', () => {
    it('Should login by username, password', async () => {
      const res = await server.post(`${routePath}/login`).send({
        user_name: 'Admin',
        passworde: '123456789'
      })
      token = res.body.token
      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('success')
      expect(token).not.toBeNull()
    })
  })
  describe('[update] endpoint', () => {
    it('update old information', async () => {
      const res = await server
        .put(routePath)
        .send({
          user_name: 'Admin1',
          passworde: '4529784612',
          first_name: 'Admin1',
          last_name: 'Admin1'
        })
        .set('Authorization', 'Bearer ' + token)

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('success')
    })
  })
})
