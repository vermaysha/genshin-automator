import { Reward } from './Reward'

export type SignReward = {
  retcode: number
  message: string
  data: {
    month: number
    awards: Array<Reward>
  }
}
