import { NextFunction, Request, Response } from 'express'
import OrderModel from '../models/order.model'
import schema from '../validate.joi/joi.orders'
import schema_newProduct from '../validate.joi/joi.addnewproduct'
const orderModel = new OrderModel()
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = schema.validate(req.body, { abortEarly: false })
    if (result.error) {
      return res.send(result.error!.details.map((item) => item.message))
    }
    const order = await orderModel.create_order(result.value.products, req.user!.user_id!)
    res.json({
      status: 'success',
      data: order,
      message: 'your information done'
    })
  } catch (error) {
    next(error)
  }
}
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.getAll()
    res.json({
      status: 'success',
      message: 'your information done',
      data: order
    })
  } catch (error) {
    next(error)
  }
}
export const selectOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const GetOne = await orderModel.getOne(req.params.id as unknown as number)
    if (GetOne == null) {
      res.send('this id is wrong or not exist')
      return
    }
    res.json({
      status: 'success',
      message: 'your information done',
      data: GetOne
    })
  } catch (error) {
    next(error)
  }
}
export const updateInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = schema.validate(req.body, { abortEarly: false })

    if (result.error) {
      return res.send(result.error!.details.map((item) => item.message))
    }
    const update = await orderModel.update_order(
      result.value.products,
      result.value,
      req.params.id as unknown as number
    )
    res.json({
      status: 'success',
      data: update,
      message: 'your information done'
    })
  } catch (error) {
    next(error)
  }
}
export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await orderModel.delete_order(req.params.order_id as unknown as number)
    res.json({
      status: 'success',
      message: 'your delete is done'
    })
  } catch (error) {
    next(error)
  }
}
export const addNewproduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = schema_newProduct.validate(req.body, { abortEarly: false })

    if (result.error) {
      return res.send(result.error!.details.map((item) => item.message))
    }
    const product = await orderModel.addNewProduct(
      req.params.id as unknown as number,
      result.value.product_id,
      result.value.quantity
    )
    res.json({
      status: 'success',
      data: product,
      message: 'your information done'
    })
  } catch (error) {
    next(error)
  }
}
