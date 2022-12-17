import { Router } from 'express'
import * as controller from '../../controllers/product.controller'
import validateJwtMiddelware from '../../middleware/validate.jwt'

const route_product = Router()
route_product.route('/').get(controller.getAll).post(validateJwtMiddelware, controller.create)
route_product
  .route('/:product_id')
  .get(controller.selectOne)
  .put(validateJwtMiddelware, controller.updatInfo)
  .delete(validateJwtMiddelware, controller.deleteProduct)
export default route_product
