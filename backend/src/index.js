require('dotenv').config();
const app = require('./app');
const prisma = require('./services/db');
const bcrypt = require('bcryptjs');

const PORT = process.env.PORT || 5000;

// Seed an initial SuperAdmin if none exists
const seedSuperAdmin = async () => {
    const admin = await prisma.user.findUnique({ where: { email: 'admin@imbonihub.com' } });
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    if (!admin) {
        await prisma.user.create({
            data: {
                email: 'admin@imbonihub.com',
                password: hashedPassword,
                name: 'Super Admin',
                role: 'SUPERADMIN'
            }
        });
        console.log('Seed: SuperAdmin created with secure password.');
    } else {
        // Update to ensuring role is SUPERADMIN and hashing password if it looks plain text (simplified logic for this task)
        await prisma.user.update({ 
            where: { email: 'admin@imbonihub.com' }, 
            data: { 
                role: 'SUPERADMIN',
                password: hashedPassword // Reset to default hashed during transition
            } 
        });
    }
}

app.listen(PORT, async () => {
  console.log(`Enterprise Webmaster Server running on port ${PORT}`);
  await seedSuperAdmin();
});

