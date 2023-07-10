import { RequestHandler } from 'express'
import { AdminService } from './admin.service'
import httpStatus from 'http-status'

const createAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { phoneNumber, ...adminData } = req.body

    if (!Number(phoneNumber)) {
      throw new Error('Not a valid PhoneNumber')
    }
    const result = await AdminService.createAdmin({
      ...adminData,
      phoneNumber,
    })
    res.status(httpStatus.OK).json({
      success: true,
      message: 'Admin created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const adminLogin: RequestHandler = async (req, res, next) => {
  try {
    const { ...loginData } = req.body
    const result = await AdminService.adminLogin(loginData)

    res.status(200).json({
      success: true,
      message: 'Token created successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const AdminController = {
  createAdmin,
  adminLogin,
}
