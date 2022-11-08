import { prisma } from './services/dbServices.js'
import { logger } from './middlewares/logger.js'
import homeRoutes from './routes/home.routes.js'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import express from 'express'

const app = express()
const port = process.env.PORT || 8000


/* Middlewares */
app.use(express.json())
app.use(cookieParser())
app.use(logger)


/* Endpoints */
app.use(homeRoutes)
app.use(authRoutes)


const server = app.listen(port, () => console.log(`Server listening on port ${port}...`))

//Disconnect database client when server dies        
server.on('close', async () => {
    try {
        await prisma.$disconnect()
    } catch (error) {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    }
})