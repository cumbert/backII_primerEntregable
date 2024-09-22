import { Router } from 'express';
import User from '../../models/user.js';
import { authToken , createHash, isValidPassword, generateToken  } from '../../utils.js';
import passport from 'passport';
import jwt from 'jsonwebtoken'; 


const router = Router();


router.post('/register', async (req, res) => {
    const { email, password } = req.body

    try {
        // Verificar si el usuario ya existe
        let existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).send({ message: "El usuario ya existe" })
        }

        // Crear un nuevo usuario y encriptar la contraseña
        const hashedPassword = createHash(password);
        const newUser = new User({ email, password: hashedPassword })

        // Guardar el usuario en la base de datos
        await newUser.save();

        res.send({ message: "Usuario registrado con éxito" })
    } catch (error) {
        res.status(500).send({ error: "Error al registrar el usuario" })
    }
})


router.post('/login', async (req,res) => {
    const { email, password } = req.body
    /*
    if(email == 'coder@coder.com' && password == "coderpass") {
        let token = jwt.sign({ email, password, role: "user"}, "coderSecret", { expiresIn: "24h" })
        res.send({ message: "Inicio de sesión exitoso", token})   

    }else{
        res.status(401).send({ message: "Credenciales incorrectas" });
    }*/

        try {
            // Buscar al usuario en la base de datos
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(401).send({ message: "Usuario no encontrado" });
            }
    
            // Validar la contraseña
            const passwordIsValid = isValidPassword(user, password);
            if (!passwordIsValid) {
                return res.status(401).send({ message: "Contraseña incorrecta" });
            }
    
            // Generar el token JWT
            const token = generateToken(user);
            res.send({ message: "Inicio de sesión exitoso", token });
        } catch (error) {
            res.status(500).send({ error: "Error al iniciar sesión" });
        }
        
})


router.get('/current', authToken, (req, res) => {
    res.send(req.user)

})

export default router;
