import mongoose from 'mongoose'

export const CheckinSchema = new mongoose.Schema({
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

export default mongoose.model('Checkin', CheckinSchema)
