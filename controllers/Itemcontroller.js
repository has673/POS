const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const addItem = async (req, res, next) => {
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

        const int = parseInt(categoryId)

        // Create the new menu item
        const newMenuItem = await prisma.menuItem.create({
            data: {
                name: name,
                description: description,
                price: price,
                availability: availability,
                categoryId: int,
            },
        });

        return res.status(201).json(newMenuItem);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const allitems = async(req,res,next)=>{
    try{
        const items = await prisma.menuItem.findMany()
        console.log(items)
        return res.status(200).json(items)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error:'internal server error'})

    }
}

const delitem = async(req,res,next)=>{
    try{
        const{id} = res.params
        const item = await prisma.menuItem.delete({
            where:{
                id:id
            }
        })
        console.log("item delted")
        return res.status(200).json(item)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error:'internal server error'})

    }
}

const edititem = async(req,res,next)=>{
    try{
        const{id} = res.params
        const { name, description, price, availability, categoryId } = req.body;
        const item = await prisma.menuItem.update({
            where:{
                id:id
            },
            data:{
              name:  name,
             description:  description,
              price:  price,
            availability: availability,

            }
        })
        console.log("item delted")
        return res.status(200).json(item)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error:'internal server error'})

    }
}


module.exports={
    addItem,
    allitems,
    delitem,
    edititem
 
}