import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'

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

const UserModel = model<IUser>('User', userSchema)

export default UserModel
