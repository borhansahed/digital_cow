import { RequestHandler } from 'express'
import { CowService } from './cow.service'
import httpStatus from 'http-status'
import { paginationHelper } from '../../../helper/pagination'
import { filtersKey } from './cow.constraint'
import pick from '../../../shared/pick'

const addNewCow: RequestHandler = async (req, res, next) => {
  try {
    const { ...cowData } = req.body

    const result = await CowService.addNewCow(cowData)
    res.status(httpStatus.OK).json({
      success: true,
      message: ' Added new Cow successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const getAllCow: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, filtersKey)

    const pagination = paginationHelper(req.query)
    const result = await CowService.getAllCow(filters, pagination)
    res.status(httpStatus.OK).json({
      success: true,
      message: ' Cows  retrieved successfully',
      meta: result?.meta,
      data: result?.data,
    })
  } catch (err) {
    next(err)
  }
}
const getOneCow: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params

    const result = await CowService.getOneCow(id)
    res.status(httpStatus.OK).json({
      success: true,
      message: ' Cow retrieved successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const deleteOneCow: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params

    const result = await CowService.deleteOneCow(id)
    res.status(httpStatus.OK).json({
      success: true,
      message: ' Cow Deleted successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const updateOneCow: RequestHandler = async (req, res, next) => {
  try {
    const { ...cowData } = req.body
    const { id } = req.params

    const result = await CowService.updateOneCow(id, cowData)
    res.status(httpStatus.OK).json({
      success: true,
      message: ' Added new Cow successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const CowController = {
  addNewCow,
  getAllCow,
  getOneCow,
  deleteOneCow,
  updateOneCow,
}
