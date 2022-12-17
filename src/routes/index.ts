import { Router } from 'express'
import userRoutes from './api/user.ruotes'
import productRoute from './api/product.ruotes'
import orderRoute from './api/order.ruotes'

const routes = Router()
routes.use('/order', orderRoute)
routes.use('/product', productRoute)
routes.use('/users', userRoutes)
export default routes
