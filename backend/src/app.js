const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const authRoutes = require('./routes/authRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const cmsRoutes = require('./routes/cmsRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const aiRoutes = require('./routes/aiRoutes');


const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('public/uploads'));

// Main modularized routes
app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/admin/users', userRoutes);
app.use('/api/admin/analytics', analyticsRoutes);
app.use('/api/admin/cms', cmsRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/admin/assistant', aiRoutes);

// Helper for root
app.get('/', (req, res) => res.json({ message: 'Imboni Hub Enterprise API' }));

module.exports = app;

