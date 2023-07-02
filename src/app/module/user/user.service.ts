import { IUser } from './user.interface'
import UserModel from './user.model'

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const result = UserModel.create(payload)
  return result
}

const getAllUser = async (): Promise<IUser[] | null> => {
  const result = await UserModel.find()
  return result
}

const getOneUser = async (id: string): Promise<IUser | null> => {
  const result = await UserModel.findById(id)
  return result
}

const deleteOneUser = async (id: string): Promise<IUser | null> => {
  const result = await UserModel.findByIdAndDelete(id)
  return result
}
export const UserService = {
  createUser,
  getAllUser,
  getOneUser,
  deleteOneUser,
}
