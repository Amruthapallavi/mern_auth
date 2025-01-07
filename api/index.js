import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoute.js'
dotenv.config();
import authRoutes from './routes/authRoute.js'
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to mongodb')
})
.catch((err)=>{
    console.log(err)
})

const app=express();


app.use(express.json());
app.listen(3000,()=>{
    console.log('Server listening on port 3000')
})

app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500 ;
    const message = err.message || 'internal server error';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    })
})