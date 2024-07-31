const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const adduser = async(req,res,next)=>{
    try{
        const{email,password,username}= req.body
        const newuser = await prisma.user.create({
            data:{
                email:email,
                password:password,
                username:username
            }
           
        })
        console.log(newuser)
        return res.status(200).json({message:'User Added'})
    }
    catch(err){
        console.log(err)
        return res.status(200).json({message:'Internal Server Error'})
    }
}
module.exports={
    adduser
}