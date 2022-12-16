import { Document, model, Schema, Types } from 'mongoose'

export interface IAccount extends Document {
  _id: Types.ObjectId
  cookie: string
  game_uid?: string
  game_biz?: string
  region?: string
  nickname?: string
  level?: number
  region_name?: string
}

export const AccountSchema = new Schema<IAccount>({
  cookie: {
    type: String,
    required: true,
  },
  game_uid: {
    type: String,
  },
  game_biz: {
    type: String,
  },
  region: {
    type: String,
  },
  nickname: {
    type: String,
  },
  level: {
    type: Number,
  },
  region_name: {
    type: String,
  },
})

export default model<IAccount>('Account', AccountSchema)
