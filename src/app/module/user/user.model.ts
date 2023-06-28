import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['buyer', 'seller'],
      required: true,
    },
    name: {
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

const UserModel = model<IUser>('User', userSchema)

export default UserModel
