/* eslint-disable no-console */

import mongoose from 'mongoose'

import app from './app'

const port = process.env.PORT || 5000

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string)
    console.log('Database Connect')
  } catch (err) {
    console.log(err)
  }
}
app.listen(port, () => {
  dbConnection()
  console.log(`app running on ${port}`)
})
