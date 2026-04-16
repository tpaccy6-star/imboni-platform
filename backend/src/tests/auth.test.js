const request = require('supertest');
const app = require('../app');
const { mockPrisma } = require('./setup');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = 'test_secret';

describe('Authentication Controller', () => {
    const testUser = {
        id: 'user-1',
        email: 'test@example.com',
        password: 'hashed-password',
        role: 'SUPERADMIN',
        name: 'Test Admin'
    };

    describe('POST /api/auth/login', () => {
        it('should login successfully with correct credentials', async () => {
            // Mock finding user
            mockPrisma.user.findUnique.mockResolvedValue(testUser);
            
            // Mock bcrypt comparison
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
            
            const response = await request(app)
                .post('/api/auth/login')
                .send({ email: 'test@example.com', password: 'correct-password' });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body.user.email).toBe(testUser.email);
        });

        it('should fail with incorrect password', async () => {
            mockPrisma.user.findUnique.mockResolvedValue(testUser);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

            const response = await request(app)
                .post('/api/auth/login')
                .send({ email: 'test@example.com', password: 'wrong-password' });

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Invalid credentials');
        });

        it('should fail if user not found', async () => {
            mockPrisma.user.findUnique.mockResolvedValue(null);

            const response = await request(app)
                .post('/api/auth/login')
                .send({ email: 'nonexistent@example.com', password: 'any' });

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Invalid credentials');
        });
    });
});
