const prisma = require('../DB/db.config')

const createitem =  async (req,res,next)=>{
    try{
        const {name , menu ,description} = req.body
        const Menu = await prisma.category.create({
            data:{
                name:name,
                menu:menu,
                description:description
    
            }
    
        })
        console.log(Menu)
        return res.status(200).json({Menu})

    }
    catch(err){
        return console.log(err)
    }
  

}
module.exports ={
    createitem
}