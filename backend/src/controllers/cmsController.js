const prisma = require('../services/db');
const { logActivity } = require('../services/activityService');

const getPosts = async (req, res) => {
    try {
        const posts = await prisma.cMS_Post.findMany({
            include: { author: { select: { name: true, email: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};

const createPost = async (req, res) => {
    const { title, slug, content, published } = req.body;
    try {
        const post = await prisma.cMS_Post.create({
            data: {
                title,
                slug,
                content,
                published,
                authorId: req.user.id
            }
        });

        await logActivity(req.user.id, 'CREATE_BLOG_POST', `CMS_Post:${post.id}`, { title });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
};

const getPages = async (req, res) => {
    try {
        const pages = await prisma.cMS_Page.findMany({
            orderBy: { updatedAt: 'desc' }
        });
        res.json(pages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pages' });
    }
};

const createPage = async (req, res) => {
    const { title, slug, content } = req.body;
    try {
        const page = await prisma.cMS_Page.create({
            data: { title, slug, content }
        });

        await logActivity(req.user.id, 'CREATE_PAGE', `CMS_Page:${page.id}`, { title });
        res.status(201).json(page);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create page' });
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, slug, content, published } = req.body;
    try {
        const post = await prisma.cMS_Post.update({
            where: { id },
            data: { title, slug, content, published }
        });
        await logActivity(req.user.id, 'UPDATE_BLOG_POST', `CMS_Post:${id}`, { title });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update post' });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.cMS_Post.delete({ where: { id } });
        await logActivity(req.user.id, 'DELETE_BLOG_POST', `CMS_Post:${id}`);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
};

const updatePage = async (req, res) => {
    const { id } = req.params;
    const { title, slug, content } = req.body;
    try {
        const page = await prisma.cMS_Page.update({
            where: { id },
            data: { title, slug, content }
        });
        await logActivity(req.user.id, 'UPDATE_PAGE', `CMS_Page:${id}`, { title });
        res.json(page);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update page' });
    }
};

const deletePage = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.cMS_Page.delete({ where: { id } });
        await logActivity(req.user.id, 'DELETE_PAGE', `CMS_Page:${id}`);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete page' });
    }
};

const getCmsStats = async (req, res) => {
    try {
        const postsCount = await prisma.cMS_Post.count();
        const publishedPosts = await prisma.cMS_Post.count({ where: { published: true } });
        const draftPosts = postsCount - publishedPosts;
        const pagesCount = await prisma.cMS_Page.count();

        res.json({
            published: publishedPosts,
            drafts: draftPosts,
            scheduled: 0, // Not implemented yet
            totalPages: pagesCount
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch CMS stats' });
    }
};

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    getPages,
    createPage,
    updatePage,
    deletePage,
    getCmsStats
};
