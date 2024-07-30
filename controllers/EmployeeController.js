const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const addemployee = async(req,res,next)=>{
    try{
        const { Name ,email,salary,Phonenumber, Address} =  req.body
        const employee = await prisma.employee.create({
            data:{
                Name:Name,
                email:email,
                salary:salary,
                Phonenumber:Phonenumber,
                Address:Address
            },
        })
        return res.status(200).json({employee})

    }
    catch(err){
        console.log(err)
        return res.status(200).json({ error:"internal server error"})
    }
}
const getemployee=async(req,res,next)=>{
    try{
        const get = await prisma.employee.findMany()
        console.log(get)
        return res.status(200).json(get)
    }
    catch(err){
        console.log(err)
        return res.status(200).json({ error:"internal server error"})
    }
}
module.exports={
    addemployee,
    getemployee
}