const Joi = require('joi');

// User schema
const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    OTP: Joi.number().integer().optional(),
    verified: Joi.boolean().optional(),
    profilePicture: Joi.string().uri().optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional()
});

// Employee schema
const employeeSchema = Joi.object({
    Name: Joi.string().required(),
    email: Joi.string().email().required(),
    salary: Joi.number().integer().optional(),
    Phonenumber: Joi.number().integer().optional(),
    dateofbirth: Joi.date().optional(),
    Address: Joi.string().optional(),
    Details: Joi.string().optional(),
    Starttime: Joi.date().optional(),
    profilePicture: Joi.string().uri().optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional()
});

// Category schema
const categorySchema = Joi.object({
    icon: Joi.string().uri().optional(),
    name: Joi.string().required(),
    menu: Joi.string().valid('NORMAL', 'NEWYEAR', 'SPECIAL', 'DRINKS', 'DESSERTS').required(),
    description: Joi.string().optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional()
});

// MenuItem schema
const menuItemSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().required(),
    availability: Joi.string().valid('IN_STOCK', 'OUT_OF_STOCK').required(),
    categoryId: Joi.number().integer().required(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional()
});

const reservationSchema = Joi.object({
    tableNumber: Joi.number().integer().positive().required(),
    paxNumber: Joi.string().required(),
    reservationDate: Joi.date().required(),
    reservationTime: Joi.date().required(),
    depositFee: Joi.number().positive().required(),
    status: Joi.string().required(),
    floor: Joi.number().integer().required(),
    customerId: Joi.number().integer().positive().required(),
    paymentMethod: Joi.string().required()
});

const customerSchema = Joi.object({
    title: Joi.string().required(),
    fullName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    emailAddress: Joi.string().email().required()
});

module.exports = {
    userSchema,
    employeeSchema,
    categorySchema,
    menuItemSchema,
    reservationSchema,
    customerSchema
};
