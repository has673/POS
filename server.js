const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Catrouter = require('./routes/Category');
const Authrouter = require('./routes/Auth');
const Adminrouter = require('./routes/Admin');
const Employeerouter = require('./routes/Employee');
const Itemrouter = require('./routes/Item');
const { swaggerUi, swaggerSpec } = require('./swagger');

// Middleware
app.use(express.json()); // For parsing application/json

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
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
