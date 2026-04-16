const prisma = require('../services/db');
const { logActivity } = require('../services/activityService');

const getSettings = async (req, res) => {
    try {
        let settings = await prisma.globalSettings.findUnique({
            where: { id: 1 }
        });
        
        // Return default empty if none exists
        if (!settings) {
            settings = {
                whatsappNumber: "",
                contactPhone: "",
                contactEmail: "",
                instagramHandle: ""
            };
        }
        res.json(settings);
    } catch (error) {
        console.error('Fetch settings error:', error);
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
};

const updateSettings = async (req, res) => {
    const data = req.body;
    try {
        const settings = await prisma.globalSettings.upsert({
            where: { id: 1 },
            update: data,
            create: { id: 1, ...data }
        });

        if (req.user) {
            await logActivity(
                req.user.id,
                'UPDATE_SETTINGS',
                'GlobalSettings',
                data
            );
        }

        res.json(settings);
    } catch (error) {
        console.error('Update settings error:', error);
        res.status(500).json({ error: 'Failed to update settings' });
    }
};

module.exports = {
    getSettings,
    updateSettings
};
