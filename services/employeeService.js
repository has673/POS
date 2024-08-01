const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const {employee} = prisma

const findEmployeeByEmail = async(email)=>{
    return  await employee.findFirst({
        where:{
            email:email
        }
    })
}
const addEmployee=async(data)=>{
    return await employee.create({data})
}

const getEmployees= async()=>{
    return await employee.findMany()
}

const getEmployeeById = async(id)=>{
    return await employee.findFirst({
        where:{
            id : parseInt(id)
        }
    })
}

const deleteEmployeeById=async(id)=>{
    return await employee.delete({
        where:{
            id:parseInt(id)
        }
    })
}
const editEmployee=async(id,data)=>{
    return await employee.update({
        where:{
            id:parseInt(id)
        },data
    })
}
const findEmployeeById = async(id)=>{
    return await employee.findFirst({
        where:{
            id:id
        }
    })
}
module.exports={
    addEmployee,
    getEmployees,
    getEmployeeById,
    deleteEmployeeById,
    editEmployee
    ,findEmployeeByEmail,
    findEmployeeById
}