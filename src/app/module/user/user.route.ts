import express from 'express'
import { UserController } from './user.controller'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/role.enum'

const route = express.Router()

route.get('/', auth.authorization(USER_ROLE.ADMIN), UserController.getAllUser)

route.get(
  '/my-profile',
  auth.authorization(USER_ROLE.ADMIN, USER_ROLE.BUYER, USER_ROLE.SELLER),
  UserController.myProfile
)

route.patch(
  '/my-profile',
  auth.authorization(USER_ROLE.ADMIN, USER_ROLE.BUYER, USER_ROLE.SELLER),
  UserController.myProfileUpDate
)

route.patch(
  '/:id',
  auth.authorization(USER_ROLE.ADMIN),
  UserController.updateOneUser
)
route.get(
  '/:id',
  auth.authorization(USER_ROLE.ADMIN),
  UserController.getOneUser
)
route.delete(
  '/:id',
  auth.authorization(USER_ROLE.ADMIN),
  UserController.deleteOneUser
)
export const UserRoute = route
