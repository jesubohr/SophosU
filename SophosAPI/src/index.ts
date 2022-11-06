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
import students from './routes/student.routes'
import teachers from './routes/teacher.routes'
import courses from './routes/course.routes'

app.use('/students', students)
app.use('/teachers', teachers)
app.use('/courses', courses)
app.get('*', (_, res) => {
  res.status(404).send('Not Found')
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
