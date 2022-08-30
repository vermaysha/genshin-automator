export default (accounts) => {
  let highestLevel
  let current

  if (accounts.length > 1)
    highestLevel = accounts[0].level
  else
    return accounts[0]

  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].level > highestLevel) {
      highestLevel = accounts[i].level ?? 0
      current = accounts[i]
    }
  }

  return current
}
