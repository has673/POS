const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new category
const addCategory = async (req, res, next) => {
    try {
        const { name, description, price, availability, categoryId } = req.body;

        // Check if the category exists
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId,
            },
        });

        if (!category) {
            return res.status(400).json({ error: 'Category not found' });
        }

        // Create the new menu item
        const newMenuItem = await prisma.menuItem.create({
            data: {
                name,
                description,
                price,
                availability,
                categoryId,
            },
        });

        return res.status(201).json(newMenuItem);
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
const getmenu =async(req,res,next)=>{
    try{
        const{id}= req.params
        const allcat = await prisma.category.findFirst({
            where:{
                id:parent(id)
            },
            include: {
                menuItems: true, // Include the related menu items
            },
        })

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        const items = allcat.menuItems
        return res.status(404).json({ items });

    }
    catch(err){
        console.log(err)
        return res.status(500).json({error:'internal server error'})

    }
}
module.exports = {
    addCategory,
    getcat,
    editcat,
    getmenu
};
