const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Catrouter = require('./Routes/Category');

// Middleware
app.use(express.json()); // For parsing application/json

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/category', Catrouter);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

