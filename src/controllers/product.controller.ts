import { NextFunction, Request, Response } from 'express'
import ProductModel from '../models/product.model'
import schema from '../validate.joi/joi.product'
const productModel = new ProductModel()

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = schema.validate(req.body, { abortEarly: false })
    if (result.error) {
      return res.send(result.error!.details.map((item) => item.message))
    }
    const product = await productModel.create_product(result.value)
    res.json({
      status: 'success',
      data: product,
      message: 'your information done'
    })
  } catch (error) {
    next(error)
  }
}
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.getAll()
    res.json({
      status: 'success',
      message: 'your information done',
      data: product
    })
  } catch (error) {
    next(error)
  }
}
export const selectOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Getone = await productModel.getOne(req.params.user_id as unknown as number)
    res.json({
      status: 'success',
      message: 'your information done',
      data: Getone
    })
  } catch (error) {
    next(error)
  }
}
export const updatInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = schema.validate(req.body, { abortEarly: false })
    if (result.error) {
      return res.send(result.error!.details.map((item) => item.message))
    }
    const update = await productModel.update_product(
      result.value,
      req.params.product_id as unknown as number
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
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productModel.delete_product(req.params.product_id as unknown as number)
    res.json({
      status: 'success',
      message: 'your delete is done'
    })
  } catch (error) {
    next(error)
  }
}
// export const addNewproduct = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const result = schema.validate(req.body, { abortEarly: false })
//     if (result.error) {
//       return res.send(result.error!.details.map((item) => item.message))
//     }
//     const product = await productModel.addNewProduct(result.value.quantity, result.value)
//     res.json({
//       status: 'success',
//       data: product,
//       message: 'your information done'
//     })
//   } catch (error) {
//     next(error)
//   }
// }
