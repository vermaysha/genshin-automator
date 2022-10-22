import mongoose from 'mongoose'

export const RedeemSchema = new mongoose.Schema({
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

export default mongoose.model('Redeem', RedeemSchema)
