import mongoose, { Schema, Document } from 'mongoose';

interface IApp extends Document {
  appId: number;
  data: {
    name: string;
    owner: number;
    secret: string;
    callback: string[];
    image: string;
  };
  createdAt: number;
  updatedAt: number;
}

const appSchema = new Schema(
  {
    appId: {
      type: Number,
      required: true,
      unique: true
    },
    data: {
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
      },
      owner: {
        type: Number,
        required: true,
        ref: 'User'
      },
      secret: {
        type: String,
        required: true,
        unique: true
      },
      callback: [
        {
          type: String,
          required: true
        }
      ],
      image: {
        type: String,
        default: null
      }
    }
  },
  {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
  }
);

const App = mongoose.model<IApp>('App', appSchema);

export default App;
