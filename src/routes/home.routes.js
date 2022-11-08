import { guard } from '../middlewares/guard.js'
import { Router } from 'express'

const router = Router()

router

    .get('/', (req, res) => res.send("Welcome!"))

    .get('/profile', guard, (req, res) => {
        res.send("profile")
    })

    
export default router