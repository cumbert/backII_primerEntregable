import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// Hashear la contraseña
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// Validar la contraseña
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)


const PRIVATE_KEY = "CoderSecret"

const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, { expiresIn: "24h" })
    return token
}

const authToken = ( req, res, next) => {
    const aunthHeader = req.headers.authorization
    if(!aunthHeader) return res.status(401).send({error: "No autenticado"})
    const token = aunthHeader.split(" ")[1]

    jwt.verify(token, PRIVATE_KEY, (errorcredentials) => {
        if(error) return res.status(403).send({ error: "No estas autorizado"})
        req.user = credentials.user
        next()    
    })


}

export { generateToken, authToken }
