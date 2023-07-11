import { RequestHandler } from 'express'
import { AdminService } from './admin.service'
import httpStatus from 'http-status'
import config from '../../../config'

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

    const { refreshToken, accessToken } = result
    const cookieOptions = {
      secure: config.node_env === 'production',
      httpOnly: true,
    }

    res.cookie('refreshToken', refreshToken, cookieOptions)
    res.status(httpStatus.OK).json({
      success: true,
      message: 'User logged in successfully',
      data: accessToken,
    })
  } catch (err) {
    next(err)
  }
}

// generate new access token with the help of refresh token
const generateWithRefreshToken: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies
    const result = await AdminService.generateWithRefreshToken(refreshToken)

    res.status(httpStatus.OK).json({
      success: true,
      message: 'New accessToken successfully created',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const AdminController = {
  createAdmin,
  adminLogin,
  generateWithRefreshToken,
}
