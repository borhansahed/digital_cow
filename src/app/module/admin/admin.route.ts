import express from 'express'
import { AdminController } from './admin.controller'
const route = express.Router()

route.post('/create-admin', AdminController.createAdmin)

export const AdminRoute = route
