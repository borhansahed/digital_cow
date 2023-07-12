import { RequestHandler } from 'express'
import { UserService } from './user.service'
import httpStatus from 'http-status'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { phoneNumber, ...userData } = req.body

    if (!Number(phoneNumber)) {
      throw new Error('invalid number')
    }
    const result = await UserService.createUser({ ...userData, phoneNumber })
    res.status(httpStatus.OK).json({
      success: true,
      message: 'user created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const getAllUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.getAllUser()
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Users retrieved successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const getOneUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.getOneUser(req.params.id)
    res.status(httpStatus.OK).json({
      success: true,
      message: 'User retrieved successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const deleteOneUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.deleteOneUser(req.params.id)
    res.status(httpStatus.OK).json({
      success: true,
      message: 'User Delete successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const updateOneUser: RequestHandler = async (req, res, next) => {
  try {
    const { ...updatedData } = req.body
    const result = await UserService.updateOneUser(updatedData, req.params.id)
    res.status(httpStatus.OK).json({
      success: true,
      message: 'User Updated successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const myProfile: RequestHandler = async (req, res, next) => {
  try {
    const userData = req.user
    const result = await UserService.getOneUser(userData.id)

    res.status(httpStatus.OK).json({
      success: true,
      message: `${userData.role} data retrieved successfully`,
      data: result,
    })
  } catch (err) {
    next(err)
  }
}
const myProfileUpDate: RequestHandler = async (req, res, next) => {
  try {
    const userData = req.user

    const result = await UserService.updateOneUser(
      req.body,
      userData.id,
      userData.role
    )
    res.status(httpStatus.OK).json({
      success: true,
      message: `${userData.role} data updated successfully`,
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserController = {
  createUser,
  getAllUser,
  getOneUser,
  deleteOneUser,
  updateOneUser,
  myProfile,
  myProfileUpDate,
}
