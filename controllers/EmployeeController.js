const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const addemployee = async(req,res,next)=>{
    try{
        const { Name ,email,salary, Address} =  req.body
        // const { photo } = req.files;
        const emp = await prisma.employee.findFirst({
            where:{
                email:email
            }
        })
        if(emp){
            return res.status(400).json({message:'employee lareday'})
        }
        const employee = await prisma.employee.create({
            data:{
                Name:Name,
                email:email,
                salary:salary,
              
                Address:Address
            },
        })
        return res.status(200).json({employee})

    }
    catch(err){
        console.log(err)
        return res.status(500).json({ error:"internal server error"})
    }
}
const getemployees=async(req,res,next)=>{
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
const getemployee=async(req,res,next)=>{
    try{
        const { id } = req.params;
        console.log(id)
        // Fetch a single employee by ID
        const employee = await prisma.employee.findUnique({
            where: { id: parseInt(id )}, // Ensure the ID is an integer
        });

        // Check if employee exists
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Return the employee data
        return res.status(200).json(employee);
    }
    catch(err){
        console.log(err)
        return res.status(200).json({ error:"internal server error"})
    }
}
const deleteemployee=async(req,res,next)=>{
    try{
        const { id } = req.params;

        // Fetch a single employee by ID
        const employee = await prisma.employee.delete({
            where: { id: parseInt(id, 10) }, // Ensure the ID is an integer
        });

        // Check if employee exists
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Return the employee data
        return res.status(200).json(employee);
    }
    catch(err){
        console.log(err)
        return res.status(200).json({ error:"internal server error"})
    }
}

const editemployee = async(req,res,next)=>{
    try{
        const{id}= req.params
        const { Name ,email,salary, Address} =  req.body
       
        const emp = await prisma.employee.findFirst({
            where:{
                id:id
            }
        })
        if(!emp){
            return res.status(400).json({message:'employee doesnt exist'})
        }
        const employee = await prisma.employee.update({
            data:{
                Name:Name,
                email:email,
                salary:salary,
                Address:Address
            } ,
        })
        return res.status(200).json({employee})

    }
    catch(err){
        console.log(err)
    }
}
module.exports={
    addemployee,
    getemployees,
    getemployee,
    deleteemployee,
    editemployee
}