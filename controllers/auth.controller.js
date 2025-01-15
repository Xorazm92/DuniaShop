import { AuthService } from '../services/auth.service.js';
import { logger } from '../utils/logger.js';

export class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    register = async (req, res) => {
        try {
            const userData = req.body;
            const { user, token } = await this.authService.register(userData);
            res.status(201).json({ user, token });
        } catch (error) {
            logger.error('Registration error:', error);
            res.status(400).json({ message: 'Ro\'yxatdan o\'tishda xatolik yuz berdi' });
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const { user, token } = await this.authService.login(email, password);
            res.json({ user, token });
        } catch (error) {
            logger.error('Login error:', error);
            res.status(401).json({ message: 'Noto\'g\'ri email yoki parol' });
        }
    }

    logout = async (req, res) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            await this.authService.logout(token);
            res.status(204).send();
        } catch (error) {
            logger.error('Logout error:', error);
            res.status(500).json({ message: 'Tizimdan chiqishda xatolik yuz berdi' });
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
            res.json({ message: 'Parolni tiklash uchun ko\'rsatmalar emailingizga yuborildi' });
        } catch (error) {
            logger.error('Forgot password error:', error);
            res.status(400).json({ message: 'Parolni tiklashda xatolik yuz berdi' });
        }
    }

    resetPassword = async (req, res) => {
        try {
            const { token, password } = req.body;
            await this.authService.resetPassword(token, password);
            res.json({ message: 'Parol muvaffaqiyatli o\'zgartirildi' });
        } catch (error) {
            logger.error('Reset password error:', error);
            res.status(400).json({ message: 'Parolni o\'zgartirishda xatolik yuz berdi' });
        }
    }

    getProfile = async (req, res) => {
        try {
            const userId = req.user.id;
            const profile = await this.authService.getProfile(userId);
            res.json(profile);
        } catch (error) {
            logger.error('Get profile error:', error);
            res.status(500).json({ message: 'Profil ma\'lumotlarini olishda xatolik yuz berdi' });
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
