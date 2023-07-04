import { Schema } from 'mongoose'

type IName = {
  firstName: string
  lastName: string
}

export type IUser = {
  _id: Schema.Types.ObjectId
  password: string
  role: 'buyer' | 'seller'
  name: IName
  phoneNumber: string
  address: string
  budget: number
  income: number
}
