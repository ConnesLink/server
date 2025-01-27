import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  userId: number;
  flags: string[];
  data: {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
  };
  authorizedApps: number[];
  createdAt: number;
  updatedAt: number;
}

const userSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true
    },
    flags: [
      {
        type: String,
        enum: ['isAdmin', 'isVerified', 'isPremium', 'isTrusted', 'isBanned']
      }
    ],
    data: {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
      },
      password: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
      },
      firstName: {
        type: String,
        required: true,
        trim: true
      },
      lastName: {
        type: String,
        required: true,
        trim: true
      },
      picture: {
        type: String,
        default: null
      }
    },
    authorizedApps: [
      {
        type: Number
      }
    ]
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
