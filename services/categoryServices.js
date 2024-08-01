const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { category, menuItem } = prisma;

const findCategoryById = async (id) => {
    return await category.findUnique({
        where: {
            id: parseInt(id)
        }
    });
};

const createCategory = async (data) => {
    return await category.create({ data });
};

const getAllCategories = async () => {
    return await category.findMany();
};

const updateCategory = async (id, data) => {
    return await category.update({
        where: {
            id: parseInt(id)
        },
        data
    });
};

const getCategoryWithMenuItems = async (id) => {
    return await category.findFirst({
        where: {
            id: parseInt(id)
        },
        include: {
            menuItems: true
        }
    });
};

module.exports = {
    findCategoryById,
    createCategory,
    getAllCategories,
    updateCategory,
    getCategoryWithMenuItems
};
