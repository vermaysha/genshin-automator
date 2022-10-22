import { model, Schema } from 'mongoose'

export const CheckinSchema = new Schema({
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

export default model('Checkin', CheckinSchema)
