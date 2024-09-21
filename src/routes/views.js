import { Router } from 'express';
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth.js';

const router = Router();

router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('login');
});

router.get('/register', isNotAuthenticated, (req, res) => {
    res.render('register');
    
});

router.get('/current', isAuthenticated, (req, res) => {
    // res.render('profile', { user: req.session.user });
    res.render('current');
});

export default router;
