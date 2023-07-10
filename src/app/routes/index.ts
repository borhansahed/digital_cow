import express from 'express'
import { UserRoute } from '../module/user/user.route'
import { CowRouter } from '../module/cow/cow.route'
import { UserController } from '../module/user/user.controller'
import { OrderRouter } from '../module/order/order.route'
import { AdminRoute } from '../module/admin/admin.route'

const digitalCowsRoutes = express.Router()
digitalCowsRoutes.post('/auth/signup', UserController.createUser)
digitalCowsRoutes.use('/users', UserRoute)
digitalCowsRoutes.use('/cows', CowRouter)
digitalCowsRoutes.use('/orders', OrderRouter)
digitalCowsRoutes.use('/admins', AdminRoute)

export default digitalCowsRoutes
