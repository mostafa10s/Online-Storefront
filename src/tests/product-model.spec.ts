import ProductModel from '../models/product.model'
import product from '../types/product.db'

describe('product Model Tests', () => {
  var productModel = new ProductModel()
  let createdProduct: product

  it('[create_product Method]', async () => {
    const newProduct = await productModel.create_product({
      product_name: 'computer',
      product_price: '3000'
    })
    createdProduct = newProduct

    expect(newProduct.product_name).not.toBeNull()
    expect(newProduct.product_price).toBeGreaterThan(0)
  })

  it('[getAll Method]', async () => {
    const productList = await productModel.getAll()
    expect(productList).not.toBeNull()
    expect(productList.length).toBeGreaterThan(0)
  })

  it('[getOne Method]', async () => {
    const productInfo = await productModel.getOne(createdProduct.product_id!)

    expect(productInfo).toEqual({
      product_id: createdProduct.product_id!,
      product_name: 'computer',
      product_price: '3000.00'
    })
  })
  it('[Update Method]', async () => {
    await productModel.update_product(
      {
        product_name: 'laptop',
        product_price: '20000.00'
      },
      createdProduct.product_id!
    )

    const productInfo = await productModel.getOne(createdProduct.product_id!)
    expect(productInfo).toEqual({
      product_id: createdProduct.product_id!,
      product_name: 'laptop',
      product_price: '20000.00'
    })
  })
  it('[delete_product Method]', async () => {
    await productModel.delete_product(createdProduct.product_id!)
    const productInfo = await productModel.getOne(createdProduct.product_id!)
    expect(productInfo).toBeFalsy()
  })
})
