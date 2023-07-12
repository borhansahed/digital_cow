import express from 'express'
import { AdminController } from './admin.controller'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/role.enum'
const route = express.Router()

route.post('/create-admin', AdminController.createAdmin)
route.post('/login', AdminController.adminLogin)
route.post('/refresh-token', AdminController.generateWithRefreshToken)
route.get(
  '/my-profile',
  auth.authorization(USER_ROLE.ADMIN),
  AdminController.myProfile
)

route.patch(
  '/my-profile',
  auth.authorization(USER_ROLE.ADMIN),
  AdminController.myProfileUpDate
)

export const AdminRoute = route
