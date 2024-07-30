const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new category
const createitem = async (req, res, next) => {
    try {
        const { name, menu, description } = req.body;
        const category = await prisma.category.create({
            data: {
                name,
                menu,
                description
            }
        });
        console.log(category);
        return res.status(200).json({ category });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all categories
const getcat = async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany();
        console.log(categories);
        return res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Optional: Edit category (implement this if needed)
const editcat = async (req, res, next) => {
    try {
        const { id } = req.params; // Assuming ID is provided in URL params
        const { name, menu, description } = req.body;
        const updatedCategory = await prisma.category.update({
            where: { id: parseInt(id, 10) },
            data: {
                name,
                menu,
                description
            }
        });
        console.log(updatedCategory);
        return res.status(200).json(updatedCategory);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createitem,
    getcat,
    editcat
};
