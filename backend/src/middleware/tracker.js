const prisma = require('../services/db');

/**
 * Middleware to track page views.
 * Filters out common API paths and static assets to track only real page loads.
 */
const trafficTracker = async (req, res, next) => {
    const { path, method } = req;
    
    // Only track GET requests that look like page views (not internal or assets)
    // In a sophisticated app, we could check headers for 'sec-fetch-dest: document'
    const isApi = path.startsWith('/api/');
    const isAsset = path.includes('.') || path.startsWith('/uploads');

    if (method === 'GET' && !isApi && !isAsset) {
        try {
            await prisma.pageView.create({
                data: { path }
            });
        } catch (error) {
            console.error('Traffic Tracking Error:', error);
        }
    }

    next();
};

module.exports = trafficTracker;
