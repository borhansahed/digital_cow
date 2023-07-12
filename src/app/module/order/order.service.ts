import mongoose from 'mongoose'
import { IOrder } from './order.interface'
import UserModel from '../user/user.model'
import { ICow } from '../cow/cow.interface'
import { IUser } from '../user/user.interface'
import CowModel from '../cow/cow.model'
import OrderModel from './order.model'
import { JwtPayload } from 'jsonwebtoken'

const createOrder = async (
  orderData: IOrder,
  cowData: ICow,
  buyerData: IUser,
  sellerData: IUser
) => {
  const session = await mongoose.startSession()
  try {
    await session.startTransaction()
    await UserModel.findByIdAndUpdate(
      orderData.buyer,
      {
        $set: { budget: buyerData.budget - cowData.price },
      },
      { session }
    )
    await CowModel.findByIdAndUpdate(
      orderData.cow,
      {
        $set: { label: 'sold out' },
      },
      { session }
    )
    await UserModel.findByIdAndUpdate(
      sellerData._id,
      { $set: { income: sellerData.income + cowData.price } },
      { session }
    )

    const result = await OrderModel.create([orderData], { session })

    await session.commitTransaction()
    await session.endSession()

    return result
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw err
  }
}

const getAllOrder = async (userInfo: JwtPayload): Promise<IOrder[]> => {
  if (userInfo?.role === 'seller') {
    let result = await OrderModel.aggregate([
      {
        $lookup: {
          from: 'cows',
          localField: 'cow',
          foreignField: '_id',
          as: 'cow',
        },
      },
      {
        $match: {
          'cow.seller': new mongoose.Types.ObjectId(userInfo.id),
        },
      },
    ])

    return (result = await OrderModel.populate(result, { path: 'buyer' }))
  }

  let query = {}
  if (userInfo?.role === 'buyer') {
    query = {
      buyer: new Object(userInfo.id),
    }
  }
  const result = await OrderModel.find(query)
    .populate({
      path: 'cow',
      populate: {
        path: 'seller',
      },
    })
    .populate('buyer')

  return result
}
const getOneOrder = async (...id: string[]) => {
  if (id.includes('seller')) {
    let result = await OrderModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id[0]),
        },
      },
      {
        $lookup: {
          from: 'cows',
          localField: 'cow',
          foreignField: '_id',
          as: 'cow',
        },
      },

      {
        $match: {
          'cow.seller': new mongoose.Types.ObjectId(id[2]),
        },
      },
    ])

    result = await OrderModel.populate(result, [
      { path: 'cow', populate: { path: 'seller' } },
      { path: 'buyer' },
    ])

    if (result.length < 1) {
      throw new Error('you are not a owner')
    }

    return result
  }

  const result = await OrderModel.findOne({ _id: id[0] })
    .populate({
      path: 'cow',
      populate: {
        path: 'seller',
      },
    })
    .populate('buyer')

  if (id.includes('buyer') && String(result?.buyer) !== id[2]) {
    throw new Error('You are not a real buyer')
  }

  return (
    result &&
    (
      await result.populate({
        path: 'cow',
        populate: {
          path: 'seller',
        },
      })
    ).populate('buyer')
  )
}

export const OrderService = {
  createOrder,
  getAllOrder,
  getOneOrder,
}
