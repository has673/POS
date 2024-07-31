const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//     try {
//         // Extract the token from the Authorization header
//         const authHeader = req.headers.authorization || req.headers.Authorization;
     
//         // Get the token by splitting the header
//         const token = authHeader.split(' ')[1];

//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         console.log('ok')
//         next();
//     } catch (error) {
//         console.error('JWT verification error:', error);
//         return res.status(401).json({ message: 'Invalid or expired token' });
//     }
// };

const verifyToken =(req,res,next)=>{
    try {
        console.log('vvv')
        console.log(req.headers.authorization)
        const decode = jwt.verify(
          req.headers.authorization,
          process.env.JWT_SECRET
        );
        req.user = decode;
        console.log(req.user)
        next();
      } catch (error) {
        console.log('jwt error')
        console.log(error);
      }
  } 
module.exports = {
    verifyToken
};
