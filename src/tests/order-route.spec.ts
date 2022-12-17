import { server, getTestUser } from './super-test-server'

describe('orders api', () => {
  const routePath = '/api/order'
  let _token: string
  let createdOrderId: number
  beforeAll(async () => {
    _token = await getTestUser()
  })
  describe('[create] endpoint', () => {
    it('Should create new order', async () => {
      const res = await server
        .post(routePath)
        .send({
          order_statues: 'active',
          products: [
            { id: 2, quantity: 5 },
            { id: 1, quantity: 6 }
          ]
        })
        .set('Authorization', _token)

      createdOrderId = res.body.data.id

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('success')
      expect(res.body.data.id).toBeGreaterThan(0)
    })
  })
  describe('[SelectAll] endpoint', () => {
    it('Should SelectAll information', async () => {
      const res = await server.get(routePath).set('Authorization', _token)

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('success')
    })
  })
  describe('[addNewProduct] endpoint', () => {
    it('Should addNewProduct new order', async () => {
      const res = await server
        .post(`${routePath}/${createdOrderId}/Add-NewProduct`)
        .send({
          product_id: 2,
          quantity: 50
        })
        .set('Authorization', _token)

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('success')
      expect(res.body.data).not.toBeNull
    })
  })
  describe('[update] endpoint', () => {
    it('update old information', async () => {
      const res = await server
        .put(`/api/order/${createdOrderId}`)
        .send({
          order_statues: 'complete',
          products: [
            {
              id: 5,
              quantity: 55
            },
            {
              id: 6,
              quantity: 22
            }
          ]
        })
        .set('Authorization', _token)

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('success')
    })
  })

  describe('[Delete] endpoint', () => {
    it('Should Delete order had created', async () => {
      const res = await server.delete(`/api/order/${createdOrderId}`).set('Authorization', _token)

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('success')
    })
  })
})
