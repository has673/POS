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

        // Fetch a single employee by ID
        const employee = await prisma.employee.findUnique({
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
module.exports={
    addemployee,
    getemployees,
    getemployee,
    deleteemployee
}