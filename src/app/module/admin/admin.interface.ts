import mongoose from 'mongoose'

type IName = {
  firstName: string
  lastName: string
}

export type IAdmin = {
  id?: mongoose.Types.ObjectId
  password: string
  role: 'admin'
  name: IName
  phoneNumber: string
  address: string
}

export type ILogin = {
  phoneNumber: string
  password: string
}
