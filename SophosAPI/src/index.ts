import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
config()

const PORT = process.env.PORT || 3000
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.get('*', (_, res) => {
  res.status(404).send('Not Found')
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
