import { Schema, model } from 'mongoose'
import { cowBreed, cowCategory, cowLocation } from './cow.constraint'
import { ICow } from './cow.interface'
import UserModel from '../user/user.model'

const cowSchema = new Schema<ICow>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    enum: cowLocation,
  },
  breed: {
    type: String,
    enum: cowBreed,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    enum: ['for sale', 'sold out'],
    default: 'for sale',
    required: true,
  },
  category: {
    type: String,
    enum: cowCategory,
    required: true,
  },

  seller: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
})

cowSchema.pre('save', async function (next) {
  console.log(this.seller)
  const isExist = await UserModel.findById(this.seller)
  console.log(isExist)
  if (!isExist) {
    throw new Error('Seller Not Found')
  } else {
    next()
  }
})

const CowModel = model<ICow>('Cow', cowSchema)

export default CowModel
