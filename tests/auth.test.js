import request from 'supertest';
import app from '../app.js';

describe('Auth Endpoints', () => {
    describe('POST /api/v1/auth/register', () => {
        it('should create a new user', async () => {
            const res = await request(app)
                .post('/api/v1/auth/register')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123'
                });
            
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('token');
        });
    });

    describe('POST /api/v1/auth/login', () => {
        it('should login existing user', async () => {
            const res = await request(app)
                .post('/api/v1/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                });
            
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });
    });
});
