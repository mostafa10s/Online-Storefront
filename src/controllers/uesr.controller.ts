import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/ueser.model'
import config from '../config'
import Jwt from 'jsonwebtoken'
import schema from '../validate.joi/joi.user'

const usermodel = new UserModel()
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = schema.validate(req.body, { abortEarly: false })
    if (result.error) {
      return res.send(result.error!.details.map((item) => item.message))
    }

    if (result) {
      const select_user = await usermodel.selectOne(result.value.user_name)

      if (select_user) {
        return res.send('this user_name is a ready exist')
      }
    }
    const user = await usermodel.create(result.value)

    res.json({
      status: 'success',
      message: 'your information done'
    })
  } catch (error) {
    next(error)
  }
}
export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await usermodel.selectData()
    res.json({
      status: 'success',
      message: 'your information done',
      data: user
    })
  } catch (error) {
    next(error)
  }
}
export const getone = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Getone = await usermodel.selectOne(req.params.user_name as unknown as string)
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
    const userId = req.user!.user_id!

    const update = await usermodel.UpdatInfo(req.body, userId)

    res.json({
      status: 'success',
      data: update,
      message: 'your information done'
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_name, passworde } = req.body

    const user = await usermodel.backPassword(user_name, passworde)

    if (!user) {
      return res.status(401).json({
        status: 'Error',
        errorMessage: 'you have to much the Username and password to throw'
      })
    }
    const token = Jwt.sign(user, config.tokenSecret as unknown as string)

    return res.json({
      status: 'success',
      token: token,
      message: 'you are Available to bass'
    })
  } catch (error) {
    next(error)
  }
}
