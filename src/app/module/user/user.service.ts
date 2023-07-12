import { IAdmin } from '../admin/admin.interface'
import AdminModel from '../admin/admin.model'
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
  return await UserModel.findById(id)
}

const deleteOneUser = async (id: string): Promise<IUser | null> => {
  return await UserModel.findByIdAndDelete(id)
}

const updateOneUser = async (
  payload: IUser | IAdmin,
  ...id: string[]
): Promise<IUser | IAdmin | null> => {
  const { name, ...userData } = payload

  const updatedUser = { ...userData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(updatedUser as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  if (id.includes('admin')) {
    return await AdminModel.findByIdAndUpdate(
      id[0],
      { $set: updatedUser },
      { new: true }
    )
  }
  return await UserModel.findByIdAndUpdate(
    id[0],
    { $set: updatedUser },
    { new: true }
  )
}
export const UserService = {
  createUser,
  getAllUser,
  getOneUser,
  deleteOneUser,
  updateOneUser,
}
