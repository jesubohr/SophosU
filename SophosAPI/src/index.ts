import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swaggerDoc.json'
config()

const PORT = process.env.PORT || 3000
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Routes
import students from './routes/student.routes'
import teachers from './routes/teacher.routes'
import courses from './routes/course.routes'
import faculties from './routes/faculty.routes'
import auth from './routes/auth.routes'
import { authenticateToken } from "./middlewares/auth.middlewares"

app.use('/students', authenticateToken, students)
app.use('/teachers', authenticateToken, teachers)
app.use('/courses', authenticateToken, courses)
app.use('/faculties', authenticateToken, faculties)
app.use('/auth', auth)
app.get('/', (_, res) => {
  res.send(`
  <h1>SophosU API</h1>
  <p>These are the avaliable endpoints:</p>
  <ul>
    <li><a href="/docs">API Documentation</a></li>
    <li><a href="/students">Students</a></li>
    <li><a href="/teachers">Teachers</a></li>
    <li><a href="/courses">Courses</a></li>
    <li><a href="/faculties">Faculties</a></li>
  </ul>
`)
})
app.get('*', (_, res) => {
  res.status(404).send('Not Found')
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
