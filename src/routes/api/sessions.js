import { Router } from 'express';
import User from '../../models/user.js';
import { createHash, isValidPassword } from '../../utils.js';
import passport from 'passport';
import jwt from 'jsonwebtoken'; // Importa jsonwebtoken correctamente


const router = Router();

/*

router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
    res.send({ status: "success", message: "usuario registrado" })
});

router.get('/failregister', async (req, res) => {
    console.log('Estrategia fallida')
    res.send({ error: "Failed" })
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {
    // const { email, password } = req.body;
    if (!req.user) return res.status(400).send({ status: "error", error: "Credenciales invalidas" })

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }

    res.send({ status: "success", payload: req.user })
});

router.get('/faillogin', (req, res) => {
    res.send("Login fallido")
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send('Error al cerrar sesión');
        res.redirect('/login');
    });
});
*/

router.post('/login', (req,res) => {
    const { email, password } = req.body
    if(email == 'coder@coder.com' && password == "coderpass") {
        let token = jwt.sign({ email, password, role: "user"}, "coderSecret", { expiresIn: "24h" })
        res.send({ message: "Inicio de sesión exitoso", token})
        //res.redirect('/current');

    }
})

router.get('/current', passport.authenticate('jwt',{session:false}),(res,req) => {
    //res.send(req.user)
    res.redirect('/current');
})

export default router;
