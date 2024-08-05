const express = require('express');
const rateLimiter = require('./rateLimiter')
const session = require('express-session');
const passport = require('passport');
const app = express();
const path = require('path');
require('./passport')
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

function Logincheck(req,res,next){
    req.user? next() : res.status(401)

}
app.use(rateLimiter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

  app.use(passport.initialize());
  app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
    passport.authenticate('google', {
         failureRedirect: '/auth/google/failure',
         successRedirect:'/auth/google/success'
         }), (req, res) => {
  res.redirect('/');
});

app.get('/auth/google/success',(req,res)=>{
    res.send('done')

})

app.get('/auth/google/failure',(req,res)=>{
    res.send('failed')
    

})


app.get('/auth/check_login',Logincheck,(req,res)=>{
    res.send('pass')
    

})
app.use('/category', Catrouter);
app.use('/auth', Authrouter);
app.use('/admin', Adminrouter);
app.use('/employee', Employeerouter);
app.use('/item', Itemrouter);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
