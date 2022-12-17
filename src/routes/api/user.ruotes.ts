import { Router } from 'express'
import * as controller from '../../controllers/uesr.controller'
import validateJwtMiddelware from '../../middleware/validate.jwt'
const routes = Router()
routes
  .route('/')
  .get(validateJwtMiddelware, controller.getAll)
  .post(controller.create)
  .put(validateJwtMiddelware, controller.updatInfo)
routes.route('/:user_id').get(validateJwtMiddelware, controller.getone)

routes.route('/login').post(controller.login)

export default routes
