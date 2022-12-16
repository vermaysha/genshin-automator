export interface Code {
  reward: string
  date: string
  code: string
  is_expired: boolean
  region: number
  reward_array: CodeReward[]
}

export interface CodeReward {
  image_path: string
  image_url?: string
  name: string
  count: string
  rarity: string
  rarityNumber?: number
}
