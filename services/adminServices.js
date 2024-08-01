const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { user } = prisma;

const createUser = async (data) => {
    return await user.create({ data });
};

module.exports = {
    createUser
};
