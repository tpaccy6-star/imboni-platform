const request = require('supertest');
const express = require('express');
const { authorize } = require('../middleware/rbac');
const jwt = require('jsonwebtoken');
const { mockPrisma } = require('./setup');

process.env.JWT_SECRET = 'test_secret';
const JWT_SECRET = 'test_secret';

// Create a dummy app to test middleware in isolation
const app = express();
app.use(express.json());

app.get('/admin-only', authorize('SUPERADMIN'), (req, res) => res.json({ success: true }));
app.get('/staff-only', authorize(['SUPERADMIN', 'EDITOR']), (req, res) => res.json({ success: true }));

describe('RBAC Middleware', () => {
    const generateToken = (userId, role) => {
        return jwt.sign({ id: userId, role: role }, JWT_SECRET);
    };

    it('should allow SUPERADMIN to access admin-only route', async () => {
        const token = generateToken('user-1', 'SUPERADMIN');
        mockPrisma.user.findUnique.mockResolvedValue({ id: 'user-1', role: 'SUPERADMIN' });

        const response = await request(app)
            .get('/admin-only')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    it('should deny EDITOR from accessing admin-only route', async () => {
        const token = generateToken('user-2', 'EDITOR');
        mockPrisma.user.findUnique.mockResolvedValue({ id: 'user-2', role: 'EDITOR' });

        const response = await request(app)
            .get('/admin-only')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(403);
    });

    it('should allow EDITOR to access staff-only route', async () => {
        const token = generateToken('user-2', 'EDITOR');
        mockPrisma.user.findUnique.mockResolvedValue({ id: 'user-2', role: 'EDITOR' });

        const response = await request(app)
            .get('/staff-only')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });

    it('should deny request without token', async () => {
        const response = await request(app).get('/admin-only');
        expect(response.status).toBe(401);
    });
});
