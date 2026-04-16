const request = require('supertest');
const app = require('../app');
const { mockPrisma } = require('./setup');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = 'test_secret';
const JWT_SECRET = 'test_secret';

describe('Opportunity Controller', () => {
    const adminToken = jwt.sign({ id: 'admin-1', role: 'SUPERADMIN' }, JWT_SECRET);
    const mockUser = { id: 'admin-1', role: 'SUPERADMIN' };

    describe('GET /api/opportunities', () => {
        it('should fetch all opportunities', async () => {
            const mockOps = [{ id: '1', title: 'Op 1' }, { id: '2', title: 'Op 2' }];
            mockPrisma.opportunity.findMany.mockResolvedValue(mockOps);

            const response = await request(app).get('/api/opportunities');

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
        });
    });

    describe('POST /api/opportunities', () => {
        it('should create an opportunity and log activity', async () => {
            const newOp = { title: 'New Op', description: 'Desc', tag: 'Tag', link: 'Link' };
            const createdOp = { id: 'op-123', ...newOp };
            
            mockPrisma.user.findUnique.mockResolvedValue(mockUser);
            mockPrisma.opportunity.create.mockResolvedValue(createdOp);
            mockPrisma.auditLog.create.mockResolvedValue({});

            const response = await request(app)
                .post('/api/opportunities')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(newOp);

            expect(response.status).toBe(201);
            expect(response.body.id).toBe('op-123');
            
            // Verify Prisma Create was called
            expect(mockPrisma.opportunity.create).toHaveBeenCalledWith({
                data: expect.objectContaining({ title: 'New Op' })
            });
            
            // Verify Audit Log was called
            expect(mockPrisma.auditLog.create).toHaveBeenCalled();
        });

        it('should block non-admins from creating', async () => {
            const editorToken = jwt.sign({ id: 'editor-1', role: 'EDITOR' }, JWT_SECRET);
            mockPrisma.user.findUnique.mockResolvedValue({ id: 'editor-1', role: 'EDITOR' });

            const response = await request(app)
                .post('/api/opportunities')
                .set('Authorization', `Bearer ${editorToken}`)
                .send({ title: 'New Op' });

            expect(response.status).toBe(403);
        });
    });
});
