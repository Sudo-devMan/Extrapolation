
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import papers from './routes/papers.route.js'
import auth from './routes/auth.route.js'
import users from './routes/users.route.js'
import { dataSource } from './data-source.js'
import { isAuthenticated } from './middleware/auth.middleware.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = 4000;

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('tiny'))
app.use(helmet())
app.use(express.static('./uploads/'))

// routing
app.use('/papers', papers)
app.use('/auth', auth)
app.use('/users', users)

app.use('/404', (req, res, next) => {
  res.status(404).json({
    message: "The route you are looking for was not found"
  })
})

async function startServer() {
  try {
    await dataSource.initialize()
    console.log("Database was initialised!")
    app.listen(PORT, () => {
      console.log("Server is now listening on port", PORT)
    })
  } catch (err) {
    console.log("Unable to initialize data source: ", err)
  }
}

startServer()


