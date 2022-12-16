import express, { Response } from 'express'

/**
 * Run main app
 */
import './main'

const app = express()
const port = process.env.PORT || 3000

app.get('/', (_req, res: Response) => {
  res
    .json({
      status: true,
    })
    .status(200)
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
