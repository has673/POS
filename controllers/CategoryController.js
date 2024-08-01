const {
    findCategoryById,
    createCategory,
    getAllCategories,
    updateCategory,
    getCategoryWithMenuItems
} = require("../services/categoryServices");

const addCategory = async (req, res, next) => {
    try {
        const { name, description, price, availability, categoryId } = req.body;

        // Check if the category exists
        const category = await findCategoryById(categoryId);
        if (!category) {
            return res.status(400).json({ error: 'Category not found' });
        }

        // Create the new menu item
        const newMenuItem = await createCategory({
            name,
            description,
            price,
            availability,
            categoryId
        });

        return res.status(201).json(newMenuItem);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCat = async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        console.log(categories);
        return res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const editCat = async (req, res, next) => {
    try {
        const { id } = req.params; // Assuming ID is provided in URL params
        const { name, menu, description } = req.body;
        const updatedCategory = await updateCategory(id, {
            name,
            menu,
            description
        });
        console.log(updatedCategory);
        return res.status(200).json(updatedCategory);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getMenu = async (req, res, next) => {
    try {
        const { id } = req.params;
        const categoryWithMenuItems = await getCategoryWithMenuItems(id);

        if (!categoryWithMenuItems) {
            return res.status(404).json({ error: 'Category not found' });
        }

        return res.status(200).json({ items: categoryWithMenuItems.menuItems });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addCategory,
    getCat,
    editCat,
    getMenu
};
