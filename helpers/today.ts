export default () => {
  const date_ob = new Date()

  // current date
  // adjust 0 before single digit date
  const date = ("0" + date_ob.getDate()).slice(-2)

  // current month
  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2)

  // current year
  const year = date_ob.getFullYear()

  return `${year}-${month}-${date}`
}