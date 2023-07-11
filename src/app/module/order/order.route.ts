import express from 'express'

import { OrderController } from './order.controller'
import { auth } from '../../middleware/auth'
import { USER_ROLE } from '../../../enum/role.enum'

const router = express.Router()

router.get(
  '/',
  auth.authorization([USER_ROLE.ADMIN, USER_ROLE.BUYER, USER_ROLE.SELLER]),
  OrderController.getAllOrder
)
router.post(
  '/',
  auth.authorization(USER_ROLE.BUYER),
  OrderController.createOrder
)

export const OrderRoute = router
