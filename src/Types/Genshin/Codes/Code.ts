import { CodeReward } from './CodeReward'

export type Code = {
  reward: string
  date: string
  code: string
  is_expired: boolean
  region: number
  reward_array: Array<CodeReward>
}
