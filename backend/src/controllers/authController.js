const prisma = require('../services/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error('FATAL: JWT_SECRET is not defined in environment variables.');
    // In a real production app, we would process.exit(1) here
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            JWT_SECRET || 'fallback_secret_for_dev_only', // Fallback should be removed in production
            { expiresIn: '24h' }
        );

        res.json({ 
            token, 
            user: { 
                id: user.id, 
                email: user.email, 
                role: user.role,
                name: user.name 
            } 
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
};

module.exports = {
    login
};
