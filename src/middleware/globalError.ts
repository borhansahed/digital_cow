/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express'
import { IErrorMessage } from '../interface/common'
import { handleValidationError } from '../error/handleValidationError'
import httpStatus from 'http-status'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const success = false
  let message = 'Something wrong here'
  let errorMessages: IErrorMessage[] = []
  if (err?.name === 'ValidationError') {
    const simpleErrorMessage = handleValidationError(err)
    message = simpleErrorMessage.message
    errorMessages = simpleErrorMessage.errorMessages
  } else if (err instanceof Error) {
    message = err?.name
    errorMessages = err.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(httpStatus.BAD_REQUEST).send({
    success,
    message,
    errorMessages,
    stack: process.env.NODE_ENV === 'development' ? err?.stack : null,
  })
}

export default globalErrorHandler
