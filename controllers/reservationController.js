const {findCustomerByEmail,addCustomer,addReservation,delReservation,getReservation, findReservation} = require('../services/reservationServices')
const { reservationSchema,customerSchema} = require('../validationSchema')
const createReservation= async(req,res,next)=>{
    const { error: reservationError } = reservationSchema.validate(reservation);
    if (reservationError) {
        return res.status(400).json({ message: reservationError.details[0].message });
    }

    const { error: customerError } = customerSchema.validate(customer);
    if (customerError) {
        return res.status(400).json({ message: customerError.details[0].message });
    }
    
    
    try{
        const {reservation ,customer} = req.body
        const existingCustomer = await findCustomerByEmail(customer.email)
        if(!existingCustomer){
         const   newcustomer = await addCustomer(customer)
         console.info(newcustomer)
        }
        const existingReservation = await findReservation(reservation.tableNumber,reservation.reservationDate,reservation.reservationTime)
        if(existingReservation){
            return res.status(400).json({ message: 'Table is already booked for the specified date and time' });
        }
        reservation.customerId = existingCustomer.id;
        const newReservation = await addReservation(reservation);

        return res.status(201).json(newReservation);

    }
    catch(err){
        console.error(err)
        return res.status(500).json({message:"internal server error"})
    }
}

const getReservation = async(req,res,next)=>{
    try{
        const reservation = await getReservation()
        return res.status(200).json({reservation})
    }

    catch(err){
        console.error(err)
        return res.status(500).json({message:"internal server error"})
    }

}

const delReservation = async(req,res,next)=>{
    try{
        const {id} = req.params
        const reservation = await delReservation(id)
        console.info("reservation deletd")
    }
    catch(err){
        console.error(err)
        return res.status(500).json({message:"internal server error"})
    }
}

module.exports={
    createReservation
}