import OrderModel from '../models/order.model'
import Order from '../types/order.db'

describe('Order Model Tests', () => {
  var orderModel = new OrderModel()
  let myName: string
  let createdOrder: Order

  it('[create_order Method]', async () => {
    const newOrder = await orderModel.create_order(
      [
        { id: 1, quantity: 4 },
        { id: 4, quantity: 16 }
      ],
      1
    )
    createdOrder = newOrder

    expect(newOrder.id).toBeGreaterThan(0)
    expect(newOrder.order_statues).not.toBeNull()
    expect(newOrder.user_id).toBeGreaterThan(0)
  })

  it('[getAll Method]', async () => {
    const orderList = await orderModel.getAll()
    expect(orderList).not.toBeNull()
    expect(orderList.length).toBeGreaterThan(0)
  })

  it('[addNewProduct Method]', async () => {
    const newOrder = await orderModel.addNewProduct(createdOrder.id!, 9, 19)
    console.log(newOrder, '***********************')

    expect(newOrder.id).toBeGreaterThan(0)
    expect(newOrder.order_id).toBeGreaterThan(0)
    expect(newOrder.product_id).toBeGreaterThan(0)
    expect(newOrder.quantity).toBeGreaterThan(0)
  })
  it('[getOne Method]', async () => {
    const orderInfo = await orderModel.getOne(createdOrder.id!)

    expect(orderInfo).toEqual({
      id: createdOrder.id!,
      fullname: 'Admin  Admin',
      user_id: createdOrder.user_id,
      order_statues: 'Active',
      products: [
        {
          order_id: createdOrder.id!,
          product_name: 'Ruffino Chianti',
          product_id: 1,
          product_price: '1.05',
          quantity: 4
        },
        {
          order_id: createdOrder.id!,
          product_name: 'Lamb - Whole Head Off',
          product_id: 4,
          product_price: '5.85',
          quantity: 16
        },

        {
          order_id: createdOrder.id!,
          product_id: 9,
          quantity: 19,
          product_name: 'Shrimp - 21/25, Peel And Deviened',
          product_price: '7.22'
        }
      ]
    })
  })
  it('[Update Method]', async () => {
    await orderModel.update_order(
      [{ id: 7, quantity: 5 }],
      { id: createdOrder.id, order_statues: 'Complete', user_id: 1 },
      createdOrder.id!
    )

    const orderInfo = await orderModel.getOne(createdOrder.id!)
    expect(orderInfo).toEqual({
      id: createdOrder.id!,
      fullname: 'Admin  Admin',
      user_id: 1,
      order_statues: 'Complete',
      products: [
        {
          order_id: createdOrder.id!,
          product_name: 'Amaretto',
          product_id: 7,
          product_price: '6.06',
          quantity: 5
        }
      ]
    })
  })
  it('[delete_order Method]', async () => {
    await orderModel.delete_order(createdOrder.id!)

    const orderInfo = await orderModel.getOne(createdOrder.id!)
    expect(orderInfo).toBeNull()
  })
})
