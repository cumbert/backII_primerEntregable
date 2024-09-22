import { Router } from 'express';
import User from '../../models/user.js';
import { authorization, createHash, isValidPassword } from '../../utils.js';
import passport from 'passport';
import jwt from 'jsonwebtoken'; 
import { passportCall } from '../../utils.js'


const router = Router();


router.post('/login', (req,res) => {
    const { email, password } = req.body
    if(email == 'coder@coder.com' && password == "coderpass") {
        let token = jwt.sign({ email, password, role: "user"}, "coderSecret", { expiresIn: "24h" })
        res.send({ message: "Inicio de sesión exitoso", token})   

    }else{
        res.status(401).send({ message: "Credenciales incorrectas" });
    }
})


router.get('/current', passportCall('jwt'),authorization('user'), (req,res) => {
    res.send(req.user)
    //res.redirect('/current');

})

export default router;
