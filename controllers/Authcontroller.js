const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const bcrypt = require('bcrypt')

const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email taken' });
        }

        // Hash the password before storing it
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await prisma.user.create({
            data: {
                username: username,
                email:email,
                password:password,
            },
        });

        // Exclude sensitive information from the response
        const { password: _, ...userWithoutPassword } = newUser;
        console.log('user added')
        return res.status(201).json(userWithoutPassword); // 201 Created
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports={
    signup
}