import express from 'express'
import { AdminController } from './admin.controller'
const route = express.Router()

route.post('/create-admin', AdminController.createAdmin)
route.post('/login', AdminController.adminLogin)
route.post('/refresh-token', AdminController.generateWithRefreshToken)

export const AdminRoute = route
