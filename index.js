import dotenv from 'dotenv';
dotenv.config({path:'./.env'})
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';



const app = express();

const PORT = process.env.PORT;

const database = process.env.DATABASE_URL;

const connect = async () =>{
    try{
       const data = await mongoose.connect(database,{useNewUrlParser: true});
       console.log(`mongoDB connected with server: ${data.connection.host}`)
    }catch(error){
        throw error;
    }
}
mongoose.connection.on('disconnected',()=>{
    console.log("mongoDB disconnected");
})

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// app.use('/api/auth',authRoute);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);



app.use((err,req,res,next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!"

    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack 
    });
})

app.listen(PORT,()=>{
    connect();
    console.log(`connected to the server ${PORT}`)
})