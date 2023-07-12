import mongoose from 'mongoose'

type IName = {
  firstName: string
  lastName: string
}

export type IUser = {
  _id: mongoose.Types.ObjectId
  id?: mongoose.Types.ObjectId
  password: string
  role: 'buyer' | 'seller'
  name: IName
  phoneNumber: string
  address: string
  budget: number
  income: number
}
