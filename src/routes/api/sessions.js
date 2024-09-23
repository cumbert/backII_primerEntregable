import { Router } from 'express';
import User from '../../models/user.js';
import { authToken , createHash, isValidPassword, generateToken  } from '../../utils.js';
import passport from 'passport';
import jwt from 'jsonwebtoken'; 


const router = Router();


router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body
    try {

        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).send('Todos los campos son obligatorios');
        }
  

        let existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).send({ message: "El usuario ya existe" })
        }
        
        const hashedPassword = createHash(password);
        const newUser = new User({first_name, last_name, email, age,  password: hashedPassword })
        
        await newUser.save();

        res.send({ message: "Usuario registrado con éxito" })
    } catch (error) {
        res.status(500).send({ error: "Error al registrar el usuario" })
    }
})


router.post('/login', async (req,res) => {
    const { email, password } = req.body
  
        try {
            
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(401).send({ message: "Usuario no encontrado" });
            }
                
            const passwordIsValid = isValidPassword(user, password);
            if (!passwordIsValid) {
                return res.status(401).send({ message: "Contraseña incorrecta" });
            }    
            
            const token = generateToken(user);

            res.cookie('token', token, {
                httpOnly: true,  // No accesible desde el lado del cliente (JavaScript)
                secure: process.env.NODE_ENV === 'production',  // Solo HTTPS en producción
                maxAge: 3600000  // 1 hora de duración
            })

            res.send({ message: "Inicio de sesión exitoso", token });
        } catch (error) {
            res.status(500).send({ error: "Error al iniciar sesión" });
        }
        
})

router.get('/current', authToken, (req, res) => {
        res.send(req.user)
})

export default router;
