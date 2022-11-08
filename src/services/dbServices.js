import { PrismaClient } from '@prisma/client'
import {
    PrismaClientInitializationError,
    PrismaClientKnownRequestError
} from '@prisma/client/runtime/index.js'


export const prisma = new PrismaClient()

export const createUser = async data => {
    try {
        await prisma.user.create({ data })

        return {
            code: 200,
            message: "User registered!"
        }
        
    } catch(error) {
        if(error instanceof PrismaClientInitializationError) {
            console.log("\nError connecting to database...\n")

            return {
                code: 503,
                message: ''
            }
        }
        
        if(error instanceof PrismaClientKnownRequestError) {
            return {
                code: 400,
                message: "User already exists!"
            }
        }

        console.error(error)

        return {
            code: 400,
            message: error.message
        }
    }
}

export const findUser = async condition => {
    const user = await prisma.user.findUnique({
        where: condition
    })

    return user
}