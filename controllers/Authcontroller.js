const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const dayjs = require('dayjs');
;
const { google } = require('googleapis');
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

// These id's and secrets should come from .env file.
const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: process.env.refresh_token });
  const generateAccessToken = async () => {
    const { token } = await oAuth2Client.getAccessToken();
    return token;
};
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.refresh_token,
      accessToken: async () => {
        return await generateAccessToken();
    },
},
  });
// const transporter = nodemailer.createTransport({
//     host: 'smtp.mailtrap.io',
//     port: 587,
//     auth: {
//         user: process.env.MAILTRAP_USER,
//         pass: process.env.MAILTRAP_PASS
//     }
// });


const generateOtp = () => Math.floor(100000 + Math.random() * 900000); 

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username },
                ],
            },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email or Username taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOtp(); // Function to generate OTP
        const otpInt = parseInt(otp);

        // Set OTP expiry time (e.g., 10 minutes from now)
        const otpExpiry = dayjs().add(10, 'minute').toDate();

        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
                OTP: otpInt,
                otpExpiry: otpExpiry, // Store OTP expiry time
            },
        });

        // const mailOptions = {
        //     from: process.env.MAILTRAP_USER,
        //     to: email,
        //     subject: 'Your OTP Code',
        //     text: `Your OTP code is ${otpInt}`, // Fixed variable name
        // };

        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         console.error(error);
        //         return res.status(500).json({ error: 'Error sending OTP' });
        //     }
        //     console.log('Email sent: ' + info.response);
        //     // Ensure the response is sent here
        //     const { password: _, OTP: __, otpExpiry: ___, ...userWithoutSensitiveInfo } = newUser;
        //     return res.status(201).json(userWithoutSensitiveInfo);
        // });

        const mailOptions = {
            from: process.env.GMAIL_USER, // Use the email address configured for sending
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otpInt}`,
        };
         
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error('Error sending OTP:', error);
                return res.status(500).json({ error: 'Error sending OTP' });
            }
            console.log('Email sent:', info.response);
        
            // Ensure newUser is available or fetch it if needed
            // const { password: _, OTP: __, otpExpiry: ___, ...userWithoutSensitiveInfo } = newUser;
        
            return res.status(201).json('ok');
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await prisma.user.findFirst({
            where: {
                email: email,
                verified:true
            },
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
           
            expiresIn: '1h', // Token expiration time
      
        });
        console.log(token)
        return res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const recoverPassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            console.log('Email and Password are required');
            return res.status(400).json({ error: 'Email and Password are required' });
        }

        // Find user by email
        const user = await prisma.user.findFirst({
            where: { email: email },
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid user' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user's password
        await prisma.user.update({
            where: { email: email },
            data: {
                password: hashedPassword,
                updatedAt: new Date(),
            },
        });

        return res.status(200).json({ message: 'Password has been reset' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const verifyotp = async(req,res,next)=>{
    try{
        const {email,otp}=req.body
        const checkuser = await prisma.user.findUnique({
            where:{
                email:email,
                OTP:otp
            }
        })
      
        if (!checkuser) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        // Update user to clear OTP after successful verification


        const currentTime = dayjs(); // Use dayjs to get the current time
        const otpExpiryTime = dayjs(checkuser.otpExpiry); // Assuming `otpExpiry` is a field in your user model

        if (currentTime.isAfter(otpExpiryTime)) {
            console.error('your otp has expired')
           
            await prisma.user.update({
                where: { email: email },
                data: { 
                    OTP: null ,
                    verified:true,
                    otpExpiry:null
    
                },
            });
            return res.status(400).json({ error: 'OTP has expired' });
        }

        await prisma.user.update({
            where: { email: email },
            data: { 
                OTP: null ,
                verified:true

            },
        });
         console.log('user verified')
        return res.status(200).json({ message: 'OTP verified successfully' });

    }
    catch(err){
        console.log(err)
    }
}

const newotp=async(req,res)=>{
    try{
        const {email}= req.body
        const otp = generateOtp(); // Function to generate OTP
        const otpInt = parseInt(otp);
        const otpExpiry = dayjs().add(10, 'minute').toDate();

        const user = await prisma.user.update({
            where:{
                email:email,           

            },
            data:{
                OTP:otpInt,
                otpExpiry:otpExpiry,
            }
        })

        // const mailOptions = {
        //     from: process.env.MAILTRAP_USER,
        //     to: email,
        //     subject: 'Your OTP Code',
        //     text: `Your OTP code is ${otpInt}`, // Fixed variable name
        // };

        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         console.error(error);
        //         return res.status(500).json({ error: 'Error sending OTP' });
        //     }
        //     console.log('Email sent: ' + info.response);
        //     // Ensure the response is sent here
            
        //     const { password: _, OTP: __, otpExpiry: ___, ...userWithoutSensitiveInfo } = newUser;
        //     return res.status(201).json('ok');
        // });
        const mailOptions = {
            from: process.env.GMAIL_USER, // Use the email address configured for sending
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otpInt}`,
        };
         
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error('Error sending OTP:', error);
                return res.status(500).json({ error: 'Error sending OTP' });
            }
            console.log('Email sent:', info.response);
        
            // Ensure newUser is available or fetch it if needed
            // const { password: _, OTP: __, otpExpiry: ___, ...userWithoutSensitiveInfo } = newUser;
        
            return res.status(201).json('ok');
        });


    }
    catch(err){
        console.error(err)
    }
}



module.exports={
  signup,
  login,
  verifyotp,
  recoverPassword,
  newotp
}