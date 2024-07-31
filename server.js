const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Catrouter = require('./Routes/Category');
const Authrouter = require('./Routes/Auth');
const Adminrouter = require('./Routes/Admin');
const Employeerouter = require('./Routes/Employee');
const Itemrouter = require('./Routes/Item');
const { swaggerUi, swaggerSpec } = require('./swagger');

// Middleware
app.use(express.json()); // For parsing application/json

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/category', Catrouter);
app.use('/auth', Authrouter);
app.use('/admin', Adminrouter);
app.use('/employee', Employeerouter);
app.use('/item', Itemrouter);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
