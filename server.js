const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express();
const port = process.env.PORT || 3000;
const Catrouter = require('./routes/category');
const Authrouter = require('./routes/auth');
const Adminrouter = require('./routes/admin');
const Employeerouter = require('./routes/employee');
const Itemrouter = require('./routes/item');
const { swaggerUi, swaggerSpec } = require('./swagger');

// Middleware
app.use(express.json()); // For parsing application/json

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(session({ secret: 'YOUR_SESSION_SECRET',resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

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
