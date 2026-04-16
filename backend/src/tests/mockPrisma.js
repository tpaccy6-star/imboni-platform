const { mockDeep, mockReset } = require('jest-mock-extended');

const mockPrisma = mockDeep();

jest.mock('../services/db', () => mockPrisma);

beforeEach(() => {
  mockReset(mockPrisma);
});

module.exports = { mockPrisma };
