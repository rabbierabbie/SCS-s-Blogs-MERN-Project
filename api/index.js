import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';//Notice the . before /
import authRoute from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Connected');
})
.catch((e)=>{
    console.log(e);
});
const app=express();
app.use(express.json());
app.use(cookieParser());//Now we can extract cookie from browser without any problem

app.listen(3000,()=>{
    console.log("Server is running on port 3000!!");
});

app.use('/api/user',userRoute);//we use the use method here
app.use('/api/auth',authRoute);//didnt add / before api

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });