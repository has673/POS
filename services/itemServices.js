const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { menuItem, category } = prisma;

const findCategoryById = async (categoryId) => {
    return await category.findUnique({
        where: {
            id: parseInt(categoryId)
        }
    });
};

const createMenuItem = async (data) => {
    return await menuItem.create({ data });
};

const getAllMenuItems = async () => {
    return await menuItem.findMany();
};

const deleteMenuItemById = async (id) => {
    return await menuItem.delete({
        where: {
            id: parseInt(id)
        }
    });
};

const updateMenuItem = async (id, data) => {
    return await menuItem.update({
        where: {
            id: parseInt(id)
        },
        data
    });
};

module.exports = {
    findCategoryById,
    createMenuItem,
    getAllMenuItems,
    deleteMenuItemById,
    updateMenuItem
};
