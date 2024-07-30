const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                email: email,
                username:username,
            },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email taken' });
        }
        const newpass = await bcrypt.hash(password,10)
        const newUser = await prisma.user.create({
            data: {
                username: username,
                email:email,
                password:newpass,
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
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expiration time
        });

        return res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const recoverPassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            console.log('Email and Password are required');
            return res.status(400).json({ error: 'Email and Password are required' });
        }

        // Find user by email
        const user = await prisma.user.findFirst({
            where: { email: email },
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid user' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user's password
        await prisma.user.update({
            where: { email: email },
            data: {
                password: hashedPassword,
                updatedAt: new Date(),
            },
        });

        return res.status(200).json({ message: 'Password has been reset' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};





module.exports={
    signup,
    login,
    recoverPassword
}