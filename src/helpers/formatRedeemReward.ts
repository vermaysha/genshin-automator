import { Code, CodeReward } from '../interfaces/codes'

export function formatRedeemReward(code: Code): Array<CodeReward> {
  const rewards: Array<CodeReward> = []
  for (const reward of code.reward_array) {
    switch (reward.rarity) {
      case 'rarity_one_star':
        reward.rarityNumber = 1
        break

      case 'rarity_two_star':
        reward.rarityNumber = 2
        break

      case 'rarity_tree_star':
        reward.rarityNumber = 3
        break

      case 'rarity_four_star':
        reward.rarityNumber = 4
        break

      case 'rarity_five_star':
        reward.rarityNumber = 5
        break

      default:
        reward.rarityNumber = 0
        break
    }

    switch (reward.image_path) {
      case 'adventurer_experience':
        reward.image_url =
          'https://upload-static.hoyoverse.com/event/2021/02/25/01ba12730bd86c8858c1e2d86c7d150d_5665148762126820826.png'
        break

      case 'primogem':
        reward.image_url =
          'https://upload-static.hoyoverse.com/event/2021/02/25/f4450e0ef470f777fca0b3dd95813734_1653002626503274756.png'
        break

      case 'mora':
        reward.image_url =
          'https://webstatic.hoyoverse.com/upload/static-resource/2022/08/12/bddc10e07950d708a371861e7be32928_4601996924011219727.png'
        break

      case 'hero_wit':
        reward.image_url =
          'https://upload-static.hoyoverse.com/event/2021/02/25/6ef98074e6e8c9c838e144d4db496434_4740225561143115197.png'
        break

      case 'mystic_enhancement_ore':
        reward.image_url =
          'https://static.wikia.nocookie.net/gensin-impact/images/5/55/Item_Mystic_Enhancement_Ore.png'
        break

      case 'fine_enhancement_ore':
        reward.image_url =
          'https://upload-static.hoyoverse.com/event/2021/02/25/22542ef6122f5ad4ac1c3834d11cdfb4_8505332314511574414.png'
        break

      default:
        reward.image_url = ''
        break
    }

    rewards.push(reward)
  }

  return rewards
}
