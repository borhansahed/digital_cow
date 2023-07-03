import { SortOrder } from 'mongoose'
import { ICow, IGenericResponse, IPagination } from './cow.interface'
import CowModel from './cow.model'

const addNewCow = async (payload: ICow): Promise<ICow | null> => {
  const result = await CowModel.create(payload)
  return result
}
const getAllCow = async (
  pagination: IPagination
): Promise<IGenericResponse<ICow[]> | null> => {
  const { page, limit, skip, sortBy, sortOrder } = pagination

  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }
  const result = await CowModel.find()
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await CowModel.countDocuments({})
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getOneCow = async (id: string): Promise<ICow | null> => {
  const result = await CowModel.findOne({ _id: id }).populate('seller')
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
