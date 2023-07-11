import { Schema, model } from 'mongoose'
import { IAdmin } from './admin.interface'
import { BcryptHelper } from '../../../helper/bcryptHelper'
import config from '../../../config'

const adminSchema = new Schema<IAdmin>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['admin'],
      required: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },

      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

adminSchema.pre('save', async function (next) {
  this.password = await BcryptHelper.bcryptPassword(
    this.password,
    config.bcrypt_salt_round as string
  )
  next()
})

const AdminModel = model<IAdmin>('Admin', adminSchema)

export default AdminModel
