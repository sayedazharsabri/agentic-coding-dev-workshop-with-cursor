import mongoose, { Document, Schema } from "mongoose";

export interface IEmployee extends Document {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  salary?: number;
  hireDate: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const employeeSchema = new Schema<IEmployee>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    department: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    salary: { type: Number, min: 0 },
    hireDate: { type: Date, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);
