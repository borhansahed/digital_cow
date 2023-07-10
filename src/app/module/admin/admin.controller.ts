import { RequestHandler } from 'express'
import { AdminService } from './admin.service'

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
    res.send(result)
  } catch (err) {
    next(err)
  }
}

export const AdminController = {
  createAdmin,
}
