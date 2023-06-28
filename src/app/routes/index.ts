import express from 'express'
import { UserRoute } from '../module/user/user.route'

const digitalCowsRoutes = express.Router()

digitalCowsRoutes.use('/users', UserRoute)

export default digitalCowsRoutes
