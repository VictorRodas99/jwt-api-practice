import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

//Valida el token
export const guard = (req, res, next) => {
    const accessToken = req.cookies['access-token']

    if(!accessToken) {
        return res.status(400).json({error: "User not authenticated!"})
    }

    try {
        const isValid = jwt.verify(accessToken, process.env.SECRET)

        if(isValid) {
            req.authenticated = true
            return next()
        }

    } catch (error) {
        res.status(400).json({ error })
    }

}