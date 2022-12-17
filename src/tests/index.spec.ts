import { server } from './super-test-server'

describe('Testing App Apis', () => {
  it('Should response with [App Running] Message', async () => {
    const res = await server.get('/')

    expect(res.statusCode).toBe(200)
    expect(res.text).toEqual('DISHASTORE Is Working')
  })
})
