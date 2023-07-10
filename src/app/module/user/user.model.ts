import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'
import { BcryptHelper } from '../../../helper/bcryptHelper'
import config from '../../../config'

const userSchema = new Schema<IUser>(
  {
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['buyer', 'seller'],
      required: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
      },
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      default: 0,
    },
    income: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  this.password = await BcryptHelper.bcryptPassword(
    this.password,
    config.bcrypt_salt_round as string
  )
  next()
})

const UserModel = model<IUser>('User', userSchema)

export default UserModel
