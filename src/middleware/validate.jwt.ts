import { NextFunction, Request, Response } from 'express'
import config from '../config'
import Jwt from 'jsonwebtoken'

const handelError = (next: NextFunction) => {
  const error: Error = new Error('login Error:please add a valid bearer token to headers ')
  next(error)
}

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const validation = req.get('Authorization')
    if (validation) {
      const bearer: string = validation.split(' ')[0].toLowerCase()
      const token = validation.split(' ')[1]

      if (bearer === 'bearer' && token) {
        const decode = Jwt.verify(token, config.tokenSecret as unknown as string)
        if (decode) {
          req.user = decode as any
          next()
        } else {
          handelError(next)
        }
      } else {
        handelError(next)
      }
    } else {
      handelError(next)
    }
  } catch (error) {
    handelError(next)
  }
}
export default validateToken
