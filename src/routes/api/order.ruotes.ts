import { Router } from 'express'
import * as controller from '../../controllers/order.controller'
import validateJwtMiddelware from '../../middleware/validate.jwt'
const route_order = Router()
route_order
  .route('/')
  .get(validateJwtMiddelware, controller.getAll)
  .post(validateJwtMiddelware, controller.create)
route_order
  .route('/:id')
  .get(validateJwtMiddelware, controller.selectOne)
  .put(validateJwtMiddelware, controller.updateInfo)
  .delete(validateJwtMiddelware, controller.deleteOrder)
route_order.route('/:id/Add-NewProduct').post(validateJwtMiddelware, controller.addNewproduct)

export default route_order
