import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import digitalCowsRoutes from './app/routes'
import globalErrorHandler from './middleware/globalError'
const app: Application = express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', digitalCowsRoutes)

app.use(globalErrorHandler)

export default app
