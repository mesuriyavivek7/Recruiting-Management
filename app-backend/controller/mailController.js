import RECRUITING from '../models/RECRUITING.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'


dotenv.config()

let transpoter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    auth:{
        user:process.env.USER_MAIL,
        pass:process.env.USER_APP_PASS
    }
})



export const sendMail=async (req,res)=>{

    const mailpreq=req.body

    let mailOption={
        from:{
            name:"UpHire",
            address:'vivekmesuriya110@gmail.com'
        },
        to:mailpreq.to,
        subject:mailpreq.subject,
        html:mailpreq.body
    }
   

    transpoter.sendMail(mailOption,(error,info)=>{
        if(error){
            console.log(error)
            res.status(402).send('there is something wrong')
        }
   

        res.status(200).send(`mail sended successfully ${info.response}`)
    })

    
}


export const sendVerificationMail=async (req,res,next)=>{
    const token=jwt.sign(req.body,process.env.JWT)

    const mailConfigurations={
       from:{
        name:"Uphire",
        address:'vivekmesuriya110@gmail.com'
       },
       to:req.body.email,
       subject:'Uphire:Verify your email address',
       text:`Hi! ${req.body.name}, You have recently created you 
    account at uphire.
    Please follow the given link to verify your email
    http://localhost:8080/api/mail/verifymail/${token} 
       Thanks`
    }

    try{
       await transpoter.sendMail(mailConfigurations)
       
       res.status(200).json("Mail for verification sended successfully")
    }catch(err){
        next(err)
    }
}


export const verifyemail=async (req,res,next)=>{
    const {token}=req.params


    jwt.verify(token,process.env.JWT,async (err,decoded)=>{
        if(err){
            return next(createError(404,"Email verification failed, possibly the link is invalid...!"))
        }else{
             console.log(decoded)
             try{
                await RECRUITING.updateOne({email:decoded.email},{$set:{email_verified:true}})
                res.status(200).send(`<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Email Verification Page</title>
                  <style>
                    body { font-family: Arial, sans-serif; background-color: #f4f4f4; display:flex; align-items:center; justify-content:center; margin:5rem; }
                    h1 { color: #333; }
                  </style>
                </head>
                <body>
                  <div>
                  <h1>Welcome to <span style="color:green;">Uphire</span></h1>
                  <br></br>
                  <p>Email verification done successfully</p>
                  <a hreaf='http://localhost:3000/'>Go To Login</a>
                  </div>
                </body>
                </html>`)
             }catch(err){
                 next(err)
             }
            
        }
    })
}