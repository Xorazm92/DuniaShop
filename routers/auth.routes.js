import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const authController = new AuthController();
export const authRouter = Router();

// Views
authRouter.get('/', (req, res) => {
    res.render('index', {
        title: 'Bosh sahifa',
        user: req.session.user
    });
});

authRouter.get('/auth/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    res.render('login', {
        title: 'Kirish',
        error: req.flash('error'),
        success: req.flash('success')
    });
});

// Auth endpoints
authRouter.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authController.login({ email, password });
        
        if (result.success) {
            req.session.user = result.user;
            req.session.token = result.token;
            req.flash('success', 'Muvaffaqiyatli kirdingiz');
            res.redirect('/');
        } else {
            req.flash('error', result.message || 'Login xatosi');
            res.redirect('/auth/login');
        }
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/auth/login');
    }
});

authRouter.post('/auth/register', async (req, res) => {
    try {
        const result = await authController.register(req.body);
        
        if (result.success) {
            req.session.user = result.user;
            req.session.token = result.token;
            req.flash('success', 'Muvaffaqiyatli ro\'yxatdan o\'tdingiz');
            res.redirect('/');
        } else {
            req.flash('error', result.message || 'Ro\'yxatdan o\'tishda xatolik');
            res.redirect('/auth/login');
        }
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/auth/login');
    }
});

authRouter.get('/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destroy error:', err);
        }
        res.redirect('/auth/login');
    });
});
