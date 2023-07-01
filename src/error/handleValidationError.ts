import mongoose from 'mongoose'
import { IErrorMessage } from '../interface/common'

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorMessages: IErrorMessage[] = Object.values(err.errors).map(
    (e: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: e?.path,
        message: e?.message,
      }
    }
  )

  return {
    message: 'Validation Error',
    errorMessages,
  }
}
