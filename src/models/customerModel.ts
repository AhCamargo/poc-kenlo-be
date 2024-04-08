import mongoose, { Schema, Document } from "mongoose";

interface IQuestion {
  question: string;
  answer: string;
}

export interface ICustomer extends Document {
  name: string;
  email: string;
  phone: string;
  questions: IQuestion[];
}

const CustomerSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  questions: [{ question: String, answer: String }],
});

const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);

export default Customer;
