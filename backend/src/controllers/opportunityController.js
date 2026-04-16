const prisma = require('../services/db');
const { logActivity } = require('../services/activityService');

const getAllOpportunities = async (req, res) => {
    try {
        const ops = await prisma.opportunity.findMany({ 
            orderBy: { createdAt: 'desc' } 
        });
        res.json(ops);
    } catch (error) {
        console.error('Fetch opportunities error:', error);
        res.status(500).json({ error: 'Failed to fetch opportunities' });
    }
};

const createOpportunity = async (req, res) => {
    let { title, description, tag, deadline, link, image } = req.body;
    
    // If a file was uploaded, use the dynamic URL
    if (req.file) {
        const baseUrl = process.env.BACKEND_URL || 'http://localhost:5000';
        image = `${baseUrl}/uploads/${req.file.filename}`;
    }

    try {
        const op = await prisma.opportunity.create({
            data: { title, description, tag, deadline, link, image }
        });

        if (req.user) {
            await logActivity(
                req.user.id,
                'CREATE_OPPORTUNITY',
                `Opportunity:${op.id}`,
                { title }
            );
        }

        res.status(201).json(op);
    } catch (error) {
        console.error('Create opportunity error:', error);
        res.status(500).json({ error: 'Failed to create opportunity' });
    }
};

const updateOpportunity = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    
    if (req.file) {
        const baseUrl = process.env.BACKEND_URL || 'http://localhost:5000';
        data.image = `${baseUrl}/uploads/${req.file.filename}`;
    }
    
    try {
        const op = await prisma.opportunity.update({
            where: { id },
            data
        });

        if (req.user) {
            await logActivity(
                req.user.id,
                'UPDATE_OPPORTUNITY',
                `Opportunity:${id}`,
                data
            );
        }

        res.json(op);
    } catch (error) {
        console.error('Update opportunity error:', error);
        res.status(500).json({ error: 'Failed to update opportunity' });
    }
};

const deleteOpportunity = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.opportunity.delete({ where: { id } });

        if (req.user) {
            await logActivity(
                req.user.id,
                'DELETE_OPPORTUNITY',
                `Opportunity:${id}`,
                { deletedAt: new Date() }
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Delete opportunity error:', error);
        res.status(500).json({ error: 'Failed to delete opportunity' });
    }
};

const incrementOpportunityView = async (req, res) => {
    const { id } = req.params;
    try {
        const op = await prisma.opportunity.update({
            where: { id },
            data: { viewCount: { increment: 1 } }
        });
        res.json({ success: true, viewCount: op.viewCount });
    } catch (error) {
        console.error('Increment view error:', error);
        res.status(500).json({ error: 'Failed to increment view' });
    }
};

module.exports = {
    getAllOpportunities,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity,
    incrementOpportunityView
};
