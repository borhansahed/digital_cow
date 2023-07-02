import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { ...userData } = req.body
    const result = await UserService.createUser(userData)
    res.status(200).json({
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
    res.status(200).json({
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
    res.status(200).json({
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
    res.status(200).json({
      success: true,
      message: 'User Delete successfully',
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
}
