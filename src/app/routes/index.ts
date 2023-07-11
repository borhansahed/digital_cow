import express from 'express'
import { UserRoute } from '../module/user/user.route'
import { CowRoute } from '../module/cow/cow.route'

import { OrderRoute } from '../module/order/order.route'
import { AdminRoute } from '../module/admin/admin.route'
import { AuthRoute } from '../module/auth/auth.route'

const digitalCowsRoutes = express.Router()

const routes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/cows',
    route: CowRoute,
  },
  {
    path: '/orders',
    route: OrderRoute,
  },
  {
    path: '/admins',
    route: AdminRoute,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
]
routes.forEach(route => digitalCowsRoutes.use(route.path, route.route))

export default digitalCowsRoutes
