import { ICow } from './cow.interface'
import CowModel from './cow.model'

const addNewCow = async (payload: ICow): Promise<ICow | null> => {
  const result = await CowModel.create(payload)
  return result
}
const getAllCow = async (): Promise<ICow[] | null> => {
  const result = await CowModel.find()
  return result
}
const getOneCow = async (id: string): Promise<ICow | null> => {
  const result = await CowModel.findById(id)
  return result
}
const deleteOneCow = async (id: string): Promise<ICow | null> => {
  const result = await CowModel.findByIdAndDelete(id)
  return result
}
const updateOneCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const result = await CowModel.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  )
  return result
}

export const CowService = {
  addNewCow,
  getAllCow,
  getOneCow,
  deleteOneCow,
  updateOneCow,
}
