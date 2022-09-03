process.env.TZ = 'Asia/Singapore'

const date_ob = new Date()

// current date
// adjust 0 before single digit date
export const date = ("0" + date_ob.getDate()).slice(-2)

// current month
export const month = ("0" + (date_ob.getMonth() + 1)).slice(-2)

// current year
export const year = date_ob.getFullYear()

export const iso_date_string = date_ob.toISOString()
