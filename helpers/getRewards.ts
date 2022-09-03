export default (rewards) => {
  let res: Record<any, any> = []
  for (let i = 0; i < rewards.length; i++) {
    const reward = rewards[i];

    switch (reward.image_path) {
      case 'primogem':
        reward.image_path = 'https://upload-static.hoyoverse.com/event/2021/02/25/f4450e0ef470f777fca0b3dd95813734_1653002626503274756.png'
        break;

      case 'mora':
        reward.image_path = 'https://upload-static.hoyoverse.com/event/2021/02/25/f4450e0ef470f777fca0b3dd95813734_1653002626503274756.png'
        break;

      case 'hero_wit':
        reward.image_path = 'https://upload-static.hoyoverse.com/event/2021/02/25/6ef98074e6e8c9c838e144d4db496434_4740225561143115197.png'
        break;

      case 'adventurer_experience':
        reward.image_path = 'https://upload-static.hoyoverse.com/event/2021/02/25/01ba12730bd86c8858c1e2d86c7d150d_5665148762126820826.png'
        break;

      case 'mystic_enhancement_ore':
        reward.image_path = 'https://upload-static.hoyoverse.com/event/2021/02/25/22542ef6122f5ad4ac1c3834d11cdfb4_8505332314511574414.png'
        break;

      case 'fine_enhancement_ore':
        reward.image_path = 'https://static.wikia.nocookie.net/gensin-impact/images/2/23/Item_Fine_Enhancement_Ore.png/revision/latest'
        break;

      default:
        break;
    }

    res.push(reward)
  }
  return res
}
