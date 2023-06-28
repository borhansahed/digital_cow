import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import digitalCowsRoutes from './app/routes'
const app: Application = express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', digitalCowsRoutes)

export default app
