import { createUser, findUser } from '../services/dbServices.js'
import bcrypt from 'bcrypt'
import { createToken } from '../jwt.js'


export const registerUser = async (req, res) => {
    const { username, email, password } = req.body //TODO: validar body
    const hashedPassword = await bcrypt.hash(password, 8)

    const { code, message } = await createUser({
        name: username,
        email,
        password: hashedPassword
    })

    res.status(code).json({ message }) 
}


export const loginUser = async (req, res) => {
    const { username, email, password } = req.body //TODO: validar req.body

    const user = await findUser({ email })

    if(!user) {
        res.status(400).json({
            error: "User not registered!"
        })
    }

    const dbPassword = user.password
    const match = await bcrypt.compare(password, dbPassword) //Comparamos las dos contraseñas (La contraseña del req.body y la que sacamos de la database)

    if(!match) {
        res.status(400).json({
            error: "Wrong username and password combination!"
        })
    }
    
    const accessToken = createToken(user) //Creamos el json web token

    res.cookie("access-token", accessToken, {
        maxAge: 2592000,
        httpOnly: true
    }) //Mandamos al front la cookie con el token (el tercer argumento es la fecha de expiración del token en segundos)
    
    res.send("login")
}