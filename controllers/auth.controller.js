import { AuthService } from '../services/auth.service.js';
import { logger } from '../utils/logger.js';

export class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    async register(userData) {
        try {
            const { user, token } = await this.authService.register(userData);
            return {
                success: true,
                user,
                token
            };
        } catch (error) {
            logger.error('Registration error:', error);
            return {
                success: false,
                message: error.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi'
            };
        }
    }

    async login(credentials) {
        try {
            const { user, token } = await this.authService.login(credentials);
            return {
                success: true,
                user,
                token
            };
        } catch (error) {
            logger.error('Login error:', error);
            return {
                success: false,
                message: error.message || 'Noto\'g\'ri email yoki parol'
            };
        }
    }

    async logout(token) {
        try {
            await this.authService.logout(token);
            return {
                success: true
            };
        } catch (error) {
            logger.error('Logout error:', error);
            return {
                success: false,
                message: error.message || 'Tizimdan chiqishda xatolik yuz berdi'
            };
        }
    }

    refreshToken = async (req, res) => {
        try {
            const { refreshToken } = req.body;
            const newToken = await this.authService.refreshToken(refreshToken);
            res.json({ token: newToken });
        } catch (error) {
            logger.error('Token refresh error:', error);
            res.status(401).json({ message: 'Token yangilashda xatolik yuz berdi' });
        }
    }

    forgotPassword = async (req, res) => {
        try {
            const { email } = req.body;
            await this.authService.forgotPassword(email);
            req.flash('success', 'Parolni tiklash uchun ko\'rsatmalar emailingizga yuborildi');
            res.redirect('/auth/login');
        } catch (error) {
            logger.error('Forgot password error:', error);
            req.flash('error', error.message || 'Parolni tiklashda xatolik yuz berdi');
            res.redirect('/auth/forgot-password');
        }
    }

    resetPassword = async (req, res) => {
        try {
            const { token, password } = req.body;
            await this.authService.resetPassword(token, password);
            req.flash('success', 'Parolingiz muvaffaqiyatli yangilandi');
            res.redirect('/auth/login');
        } catch (error) {
            logger.error('Reset password error:', error);
            req.flash('error', error.message || 'Parolni yangilashda xatolik yuz berdi');
            res.redirect('/auth/reset-password');
        }
    }

    getProfile = async (req, res) => {
        try {
            const user = req.session.user;
            if (!user) {
                return res.redirect('/auth/login');
            }
            res.render('profile', { user });
        } catch (error) {
            logger.error('Get profile error:', error);
            req.flash('error', 'Profil ma\'lumotlarini olishda xatolik');
            res.redirect('/');
        }
    }

    updateProfile = async (req, res) => {
        try {
            const userId = req.user.id;
            const profileData = req.body;
            const updatedProfile = await this.authService.updateProfile(userId, profileData);
            res.json(updatedProfile);
        } catch (error) {
            logger.error('Update profile error:', error);
            res.status(500).json({ message: 'Profil ma\'lumotlarini yangilashda xatolik yuz berdi' });
        }
    }

    changePassword = async (req, res) => {
        try {
            const userId = req.user.id;
            const { currentPassword, newPassword } = req.body;
            await this.authService.changePassword(userId, currentPassword, newPassword);
            res.json({ message: 'Parol muvaffaqiyatli o\'zgartirildi' });
        } catch (error) {
            logger.error('Change password error:', error);
            res.status(400).json({ message: 'Parolni o\'zgartirishda xatolik yuz berdi' });
        }
    }
}
