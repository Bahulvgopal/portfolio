import mongoose, {
  Schema,
  Model,
  HydratedDocument,
} from "mongoose";

export interface IAdmin {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AdminDocument = HydratedDocument<IAdmin>;

const AdminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Admin: Model<IAdmin> =
  mongoose.models.Admin ||
  mongoose.model<IAdmin>("Admin", AdminSchema);

export default Admin;