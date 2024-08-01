const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

 const {reservation , customer} = prisma

 const findCustomerByEmail = async(email)=>{
    return await customer.findUnique({
      where:{
         emailAddress:email
      }
    })
 }

 const addCustomer=async(data)=>{
   return  await customer.create(data)
 }

 const addReservation = async(data)=>{
   return  await reservation.create(data)
 }

 const getReservation = async()=>{
   return await reservation.findMany()

 }

 const delReservation = async(id)=>{
   return await reservation.delete({
      where:{
         id:id
      }
   })
 }

 const editResercation=async(id,data)=>{
     return await  reservation.update({
      where:{
         id:id
      },
      include:{
         data
      }
     })
 }
 const findReservation = async(tableNumber,reservationDate, reservationTime)=>{
   return await reservation.findMany({
      where:{
         tableNumber,reservationDate, reservationTime

      }
   })
}


 module.exports={
   findCustomerByEmail,
   addCustomer,
   addReservation,
   getReservation,
   delReservation,
   editResercation,
   findReservation
 }