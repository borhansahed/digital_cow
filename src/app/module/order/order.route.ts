import express from 'express'

import { OrderController } from './order.controller'

const router = express.Router()

router.get('/', OrderController.getAllOrder)
router.post('/', OrderController.createOrder)

export const OrderRouter = router
