import { RequestHandler } from 'express'
import { CowService } from './cow.service'
import httpStatus from 'http-status'

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
    const result = await CowService.getAllCow()
    res.status(httpStatus.OK).json({
      success: true,
      message: ' Cows  retrieved successfully',
      data: result,
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
