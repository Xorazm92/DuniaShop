import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../configs/db.js';
import { logger } from '../utils/logger.js';

export class AuthService {
    async register(userData) {
        try {
            const { email, password, ...otherData } = userData;
            
            // Check if user already exists
            const existingUser = await db('users').where({ email }).first();
            if (existingUser) {
                throw new Error('Bu email allaqachon ro\'yxatdan o\'tgan');
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create user
            const [user] = await db('users')
                .insert({
                    ...otherData,
                    email,
                    password: hashedPassword
                })
                .returning(['id', 'email', 'first_name', 'last_name', 'created_at']);

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            return { user, token };
        } catch (error) {
            logger.error('Registration service error:', error);
            throw error;
        }
    }

    async login(credentials) {
        try {
            const { email, password } = credentials;

            // Find user
            const user = await db('users')
                .where({ email })
                .first();

            if (!user) {
                throw new Error('Email yoki parol noto\'g\'ri');
            }

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error('Email yoki parol noto\'g\'ri');
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            const { password: _, ...userWithoutPassword } = user;
            return { user: userWithoutPassword, token };
        } catch (error) {
            logger.error('Login service error:', error);
            throw error;
        }
    }
}
