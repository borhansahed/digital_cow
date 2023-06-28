import { IUser } from './user.interface'
import UserModel from './user.model'

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const result = UserModel.create(payload)
  return result
}

export const UserService = {
  createUser,
}
