import { server, getTestUser } from './super-test-server'

describe('products api', () => {
  const routePath = '/api/product'
  let _token: string
  let createdProductId: number
  beforeAll(async () => {
    _token = await getTestUser()
  })

  describe('[create] endpoint', () => {
    it('Should create new product', async () => {
      const res = await server
        .post(routePath)
        .send({
          product_name: 'computer',
          product_price: 3000
        })
        .set('Authorization', _token)

      createdProductId = res.body.data.product_id

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('success')
    })
  })

  describe('[update] endpoint', () => {
    it('update old information', async () => {
      const res = await server
        .put(`${routePath}/${createdProductId}`)
        .send({
          product_name: 'laptop',
          product_price: 2000
        })
        .set('Authorization', _token)

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('success')
    })
  })
  describe('[SelectAll] endpoint', () => {
    it('Should SelectAll information from product', async () => {
      const res = await server.get(routePath).set('Authorization', _token)
      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('success')
      expect(res.body.data.length).toBeGreaterThan(0)
    })
  })
  describe('[SelectOne] endpoint', () => {
    it('Should SelectAll information from product', async () => {
      const res = await server.get(`${routePath}/${createdProductId}`).set('Authorization', _token)
      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('success')
    })
  })
  describe('[Delete] endpoint', () => {
    it('Should Delete product had created', async () => {
      const res = await server
        .delete(`${routePath}/${createdProductId}`)
        .set('Authorization', _token)

      expect(res.statusCode).toBe(200)
      expect(res.body.status).toBe('success')
    })
  })
})
