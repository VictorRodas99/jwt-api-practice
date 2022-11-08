import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

export const createToken = user => {
    const token = jwt.sign({ id: user.id, username: user.name }, process.env.SECRET) //podemos poner un tercer argumento (fecha de expiración del token) 
    return token
}