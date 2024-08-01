const {
    findCategoryById,
    createMenuItem,
    getAllMenuItems,
    deleteMenuItemById,
    updateMenuItem
} = require('../services/itemServices');

const {menuItemSchema} = require('../validationSchema')

const addItem = async (req, res, next) => {
    const { error } = menuItemSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const { name, description, price, availability, categoryId } = req.body;

        // Check if the category exists
        const category = await findCategoryById(categoryId);
        if (!category) {
            return res.status(400).json({ error: 'Category not found' });
        }

        // Create the new menu item
        const newMenuItem = await createMenuItem({
            name,
            description,
            price,
            availability,
            categoryId: parseInt(categoryId)
        });

        return res.status(201).json(newMenuItem);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const allItems = async (req, res, next) => {
    try {
        const items = await getAllMenuItems();
        console.info(items);
        return res.status(200).json(items);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const delItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await deleteMenuItemById(id);
        console.info("Item deleted");
        return res.status(200).json(item);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const editItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price, availability, categoryId } = req.body;
        const updatedItem = await updateMenuItem(id, {
            name,
            description,
            price,
            availability
        });
        console.info("Item updated");
        return res.status(200).json(updatedItem);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addItem,
    allItems,
    delItem,
    editItem
};
