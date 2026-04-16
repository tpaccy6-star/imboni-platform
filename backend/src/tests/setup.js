const { mockDeep, mockReset } = require('jest-mock-extended');

const mockPrisma = mockDeep();

// This MUST happen before any controllers or routes are required
jest.mock('../services/db', () => mockPrisma);

module.exports = { mockPrisma };
