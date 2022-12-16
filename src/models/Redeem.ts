import { Document, model, Schema, Types } from 'mongoose'

export interface IRedeem extends Document {
  _id: Types.ObjectId
  code: string
  uid: string
  response: object
  redeemAt: object
}

export const RedeemSchema = new Schema<IRedeem>({
  code: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  response: {
    type: Object,
    required: true,
  },
  redeemAt: {
    type: Date,
    default: Date.now(),
  },
})

export default model<IRedeem>('Redeem', RedeemSchema)
