import { RequestHandler } from 'express'

import { OrderService } from './order.service'
import httpStatus from 'http-status'
import UserModel from '../user/user.model'
import CowModel from '../cow/cow.model'

const createOrder: RequestHandler = async (req, res, next) => {
  try {
    const { ...orderData } = req.body
    const buyer = await UserModel.findById(orderData.buyer)
    const cow = await CowModel.findById(orderData.cow)
    const seller = await UserModel.findById(cow?.seller)

    if (cow?.label === 'sold out') {
      throw new Error('Cow already sold out')
    }
    if (buyer?.budget && cow && buyer?.budget < cow?.price) {
      throw new Error("Buyer hasn't enough money")
    }

    if (buyer && cow && seller) {
      const result = await OrderService.createOrder(
        orderData,
        cow,
        buyer,
        seller
      )
      res.status(httpStatus.OK).json({
        success: true,
        message: ' Buy a Cow successfully',
        data: result,
      })
    }
  } catch (err) {
    next(err)
  }
}
const getAllOrder: RequestHandler = async (req, res, next) => {
  try {
    const result = await OrderService.getAllOrder(req.user)
    res.status(httpStatus.OK).json({
      success: true,
      message: ' Orders retrieved successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const getOneOrder: RequestHandler = async (req, res, next) => {
  try {
    const result = await OrderService.getOneOrder(req.params.id, req.user)
    res.status(httpStatus.OK).json({
      success: true,
      message: ' Orders retrieved successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const OrderController = {
  createOrder,
  getAllOrder,
  getOneOrder,
}
