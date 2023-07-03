import { SortOrder } from 'mongoose'
import { ICow, IFilter, IGenericResponse, IPagination } from './cow.interface'
import CowModel from './cow.model'
import { searchAbleFields } from './cow.constraint'

const addNewCow = async (payload: ICow): Promise<ICow | null> => {
  const result = await CowModel.create(payload)
  return result
}
const getAllCow = async (
  filter: IFilter,
  pagination: IPagination
): Promise<IGenericResponse<ICow[]> | null> => {
  const { searchTerm, maxPrice, minPrice, ...filterData } = filter
  const andCondition = []

  if (searchTerm) {
    andCondition.push({
      $or: searchAbleFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: {
          $regex: value,
          $options: 'i',
        },
      })),
    })
  }

  if (maxPrice) {
    andCondition.push({
      price: { $lte: Number(maxPrice) },
    })
  }
  if (minPrice) {
    andCondition.push({
      price: { $gte: Number(minPrice) },
    })
  }

  const { page, limit, skip, sortBy, sortOrder } = pagination

  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const mainCondition = andCondition.length > 0 ? { $and: andCondition } : {}
  const result = await CowModel.find(mainCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await CowModel.countDocuments(mainCondition)
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
