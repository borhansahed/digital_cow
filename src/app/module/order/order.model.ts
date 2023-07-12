import { Schema, model } from 'mongoose'
import { IOrder } from './order.interface'
import UserModel from '../user/user.model'

const orderSchema = new Schema<IOrder>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'Cow',
      required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

orderSchema.pre('save', async function (next) {
  const isExist = await UserModel.findById(this.buyer)

  if (!isExist) {
    throw new Error('Buyer Not Found')
  } else {
    next()
  }
})
const OrderModel = model<IOrder>('Order', orderSchema)

export default OrderModel
