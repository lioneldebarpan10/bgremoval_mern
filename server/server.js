import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

// App Config 
const app = express()
const PORT = process.env.PORT || 4000

// Connect DB (start but don't let a failed connection crash the process)
connectDB().catch(err => {
  console.error('Failed to connect to database on startup:', err.message || err)
})

// initialize Middlewares
app.use(express.json())
// Allow CORS for all origins by default and enable preflight responses
app.use(cors({ origin: true }))
app.options('*', cors())

// API Routes
app.get('/', (req, res) => {
  res.send("API is Working")
})

app.use('/api/user' , userRouter)
app.use('/api/image' ,imageRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
