const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Catrouter = require('./Routes/Category');
const Authrouter = require('./Routes/Auth');
// Middleware
app.use(express.json()); // For parsing application/json

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/category', Catrouter);
app.use('/auth',Authrouter)

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

