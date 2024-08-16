import express from "express"
import dotenv from "dotenv"


//importing mongoose
import mongoose from "mongoose"

import cors from 'cors'

import cookieParser from "cookie-parser"

//import routers
import authRoute from './routes/auth.js'

const app=express()
dotenv.config()




//cors settings
const corsOptions={
    origin:(origin,callback)=>{
        const allowedOrigins=[
            "http://localhost:3000",
        ];
        const isAllowed = allowedOrigins.includes(origin);
        callback(null, isAllowed ? origin : false);
    },
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}


//middleware for using cors
app.use(cors(corsOptions));



//this middleware for authentication
app.use(cookieParser())
//using json middleware where we can easily get our json data
app.use(express.json())




//connecting with mongodb atlas

const connect=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("connected to mongodb!")
    }catch(err){
        throw err
    }
}
mongoose.connection.on("disconnected",()=>{
   console.log("mongodb disconnected")
})
mongoose.connection.on("connected",()=>{
    console.log("mongodb connected")
})


//middlewares
app.use('/api/auth',authRoute)




//middleware for error handeling
app.use((err,req,res,next)=>{
    const errStatus=err.status || 500
    const errmsg=err.message || "Something went wrong"
    return res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errmsg,
        stack:err.stack

    })
})


app.listen(8000,()=>{
    connect()
    console.log("connected on port:8000 to backend!")
})