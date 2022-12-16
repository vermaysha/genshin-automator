import { Document, model, Schema, Types } from 'mongoose'

export interface ICheckin extends Document {
  _id: Types.ObjectId
  uid: string
  response: object
  checkinAt: object
}

export const CheckinSchema = new Schema<ICheckin>({
  uid: {
    type: String,
    required: true,
  },
  response: {
    type: Object,
    required: true,
  },
  checkinAt: {
    type: Date,
    default: Date.now(),
  },
})

export default model<ICheckin>('Checkin', CheckinSchema)
