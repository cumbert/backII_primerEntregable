import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'


export const passportCall = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy,function(err, user, info){
            if(err) return next(err)
            if(!user) {
                return res.status(401).send({error:info.messages?info.messages:info.toString()})
            }    
            req.user = user
            next()
        })(req, res, next)
    }
}

export const authorization = (role) => {
    return async (req, res, next ) => {
        if(!req.user) return res.status(401).send({error: "Unauthorized"})
        if(req.user.role !== role) return res.status(403).send({error: "No permission"})  
        next()      
    }
}


export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)


const PRIVATE_KEY = "CoderSecret"

const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, { expiresIn: "24h" })
    return token
}

const authToken = (req, res, next) => {
    const token = req.cookies.token
    if (!token) return res.status(401).send({ error: "No autenticado" });
    
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({ error: "No autorizado" });
        req.user = credentials.user;
        next();
    })
}
export { generateToken, authToken }
