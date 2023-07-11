import { IUser } from './user.interface'
import UserModel from './user.model'

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const result = await UserModel.create(payload)
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

const updateOneUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const { name, ...userData } = payload

  const updatedUser = { ...userData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(updatedUser as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await UserModel.findByIdAndUpdate(
    id,
    { $set: updatedUser },
    { new: true }
  )
  return result
}
export const UserService = {
  createUser,
  getAllUser,
  getOneUser,
  deleteOneUser,
  updateOneUser,
}
