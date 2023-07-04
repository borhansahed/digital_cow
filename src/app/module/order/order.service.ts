import mongoose from 'mongoose'
import { IOrder } from './order.interface'
import UserModel from '../user/user.model'
import { ICow } from '../cow/cow.interface'
import { IUser } from '../user/user.interface'
import CowModel from '../cow/cow.model'
import OrderModel from './order.model'

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

const getAllOrder = async (): Promise<IOrder[]> => {
  const result = await OrderModel.find().populate('cow').populate('buyer')
  return result
}

export const OrderService = {
  createOrder,
  getAllOrder,
}
