const { addEmployee,getEmployees,getEmployeeById,deleteEmployeeById,editEmployee,findEmployeeByEmail, findEmployeeById } = require("../services/employeeService")


const addemployee = async(req,res,next)=>{
    try{
        const { Name ,email,salary, Address} =  req.body
        const emp = await findEmployeeByEmail(email)
        if(emp){
            return res.status(400).json({message:'employee lareday'})
        }
        const employee = await addEmployee(Name,email,salary,Address)
        return res.status(200).json({employee})

    }
    catch(err){
        console.error(err)
        return res.status(500).json({ error:"internal server error"})
    }
}
const getemployees=async(req,res,next)=>{
    try{
        const get = await getEmployees()
        console.info(get)
        return res.status(200).json(get)
    }
    catch(err){
        console.error(err)
        return res.status(200).json({ error:"internal server error"})
    }
}
const getemployee=async(req,res,next)=>{
    try{
        const { id } = req.params;
        
        const employee = await getEmployeeById(id)

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        return res.status(200).json(employee);
    }
    catch(err){
        console.error(err)
        return res.status(200).json({ error:"internal server error"})
    }
}
const deleteemployee=async(req,res,next)=>{
    try{
        const { id } = req.params;
        const employee = await deleteEmployeeById(id)
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        return res.status(200).json(employee);
    }
    catch(err){
        console.error(err)
        return res.status(200).json({ error:"internal server error"})
    }
}

const editemployee = async(req,res,next)=>{
    try{
        const{id}= req.params
        const { Name ,email,salary, Address} =  req.body
       
        const emp = await findEmployeeById(id)
        if(!emp){
            return res.status(400).json({message:'employee doesnt exist'})
        }
        const employee = await editEmployee(id,{Name,email,salary,Address})
        return res.status(200).json({employee})

    }
    catch(err){
        console.error(err)
    }
}
module.exports={
    addemployee,
    getemployees,
    getemployee,
    deleteemployee,
    editemployee
}