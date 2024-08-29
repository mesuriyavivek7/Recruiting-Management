import RECRUITING from '../models/RECRUITING.js'
import ENTERPRISE from '../models/ENTERPRISE.js'
import RECRUITINGTEAM from '../models/RECRUITINGTEAM.js'
import ENTERPRISETEAM from '../models/ENTERPRISETEAM.js'
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
        html:`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration Success</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    color: #333333;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #4CAF50;
                    padding: 10px;
                    text-align: center;
                    color: #ffffff;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }
                .content {
                    padding: 20px;
                }
                .content h1 {
                    color: #4CAF50;
                }
                .content p {
                    line-height: 1.6;
                    font-size: 16px;
                }
                .cred-data{
                    display: flex;
                    flex-direction: column;
                    gap:.3rem;
                    margin-bottom:.5rem;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 12px;
                    color: #888888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Registration Successful!</h1>
                </div>
                <div class="content">
                    <h1>Welcome to UPHIRE,</h1>
                    <p>Dear ${mailpreq.name},</p>
                    <p>Thank you for registering with us. Your account has been created successfully.</p>
                    <p>You are now a part of the fastest-growing network of Recruiting firms in the world.
                        Your credentials for accessing the UPHIRE platform are given below.</p>
                    <div>
                       <div class="cred-data">
                         <span>Username:</span>
                         <span style="color:blue;">${mailpreq.to}</span>
                       </div>
                       <div class="cred-data">
                         <span>Password:</span>
                         <span>uphire</span>
                       </div>
                    </div>
                    
                    <p>The Uphire Team</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Uphire. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `
    }
   

    transpoter.sendMail(mailOption,(error,info)=>{
        if(error){
            console.log(error)
            res.status(402).send('there is something wrong')
        }
   

        res.status(200).send(`mail sended successfully ${info.response}`)
    })

    
}


export const sendTeamMemberNotifyMail=async (req,res)=>{
    const mailpreq=req.body
    let mailOption={
        from:{
            name:"UpHire",
            address:'vivekmesuriya110@gmail.com'
        },
        to:mailpreq.to,
        subject:"Invited to UPHIRE",
        html:`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration Success</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    color: #333333;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #4CAF50;
                    padding: 10px;
                    text-align: center;
                    color: #ffffff;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }
                .content {
                    padding: 20px;
                }
                .content h1 {
                    color: #4CAF50;
                }
                .content p {
                    line-height: 1.6;
                    font-size: 16px;
                }
                .cred-data{
                    display: flex;
                    flex-direction: column;
                    gap:.3rem;
                    margin-bottom:.5rem;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 12px;
                    color: #888888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Registration Successful!</h1>
                </div>
                <div class="content">
                    <h1>Welcome to UPHIRE,</h1>
                    <p>Dear ${mailpreq.name},</p>
                    <p>You are invited to uphire by your friend ${mailpreq.inviter_name}. Your account has been created successfully.</p>
                    <p>You are now a part of the fastest-growing network of Recruiting firms in the world.
                        Your credentials for accessing the UPHIRE platform are given below.</p>
                    <div>
                       <div class="cred-data">
                         <span>Username:</span>
                         <span style="color:blue;">${mailpreq.to}</span>
                       </div>
                       <div class="cred-data">
                         <span>Password:</span>
                         <span>uphire</span>
                       </div>
                    </div>
                    
                    <p>The Uphire Team</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Uphire. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `
    }

    transpoter.sendMail(mailOption,(error,info)=>{
        if(error){
            console.log(error)
            res.status(402).send('there is something wrong')
        }
   

        res.status(200).send(`mail sended successfully ${info.response}`)
    })
   
}

//sending verification code to enterprise when created account
export const sendVerificationMailEnterprise=async (req,res,next)=>{
    const token=jwt.sign(req.body,process.env.JWT)

    const mailConfigurations={
       from:{
        name:"Uphire",
        address:'vivekmesuriya110@gmail.com'
       },
       to:req.body.email,
       subject:'Uphire:Verify your email address',
       html:`<!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Email Verification</title>
           <style>
               body {
                   font-family: Arial, sans-serif;
                   background-color: #f4f4f4;
                   margin: 0;
                   padding: 0;
                   color: #333;
               }
               .container {
                   width: 100%;
                   max-width: 600px;
                   margin: 0 auto;
                   padding: 20px;
                   background-color: #ffffff;
                   border-radius: 8px;
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
               }
               .header {
                   text-align: center;
                   padding: 20px 0;
                   border-bottom: 1px solid #eeeeee;
               }
               .header img {
                   width: 80px;
               }
               .content {
                   padding: 20px 0;
                   text-align: center;
               }
               .content h1 {
                   color: #333;
               }
               .content p {
                   color: #555;
               }
               .verify-button {
                   display: inline-block;
                   padding: 10px 20px;
                   font-size: 16px;
                   color: #ffffff;
                   background-color: #007bff;
                   border-radius: 5px;
                   text-decoration: none;
                   margin-top: 20px;
               }
               .footer {
                   text-align: center;
                   padding: 20px 0;
                   border-top: 1px solid #eeeeee;
                   color: #aaa;
               }
               .footer p {
                   font-size: 12px;
               }
           </style>
       </head>
       <body>
           <div class="container">
               <div class="header">
                   <img src="https://res.cloudinary.com/djxavfpqc/image/upload/v1723472100/companylogo_lju2zb.png" alt="Company Logo">
               </div>
               <div class="content">
                   <h1>Email Verification</h1>
                   <p>Hi ${req.body.name},</p>
                   <p>Thank you for registering with us. Please click the button below to verify your email address:</p>
                   <a href="http://localhost:8080/api/mail/enterpriseverifymail/${token}" class="verify-button">Verify Your Email</a>
               </div>
               <div class="footer">
                   <p>If you did not create an account, please ignore this email.</p>
                   <p>&copy; 2024 Uphire. All rights reserved.</p>
               </div>
           </div>
       </body>
       </html>
       `
    }
    

    try{
       await transpoter.sendMail(mailConfigurations)
       
       res.status(200).json("Mail for verification sended successfully")
    }catch(err){
        next(err)
    }
}


//sending email for verification when user update his email address
export const sendEmailUpdateVerificationEnterprise=async (req,res,next)=>{

    const token=jwt.sign(req.body,process.env.JWT)

    const mailConfigurations={
       from:{
        name:"Uphire",
        address:'vivekmesuriya110@gmail.com'
       },
       to:req.body.email,
       subject:'Uphire:Verify your email address',
       html:`<!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Email Verification</title>
           <style>
               body {
                   font-family: Arial, sans-serif;
                   background-color: #f4f4f4;
                   margin: 0;
                   padding: 0;
                   color: #333;
               }
               .container {
                   width: 100%;
                   max-width: 600px;
                   margin: 0 auto;
                   padding: 20px;
                   background-color: #ffffff;
                   border-radius: 8px;
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
               }
               .header {
                   text-align: center;
                   padding: 20px 0;
                   border-bottom: 1px solid #eeeeee;
               }
               .header img {
                   width: 80px;
               }
               .content {
                   padding: 20px 0;
                   text-align: center;
               }
               .content h1 {
                   color: #333;
               }
               .content p {
                   color: #555;
               }
               .verify-button {
                   display: inline-block;
                   padding: 10px 20px;
                   font-size: 16px;
                   color: #ffffff;
                   background-color: #007bff;
                   border-radius: 5px;
                   text-decoration: none;
                   margin-top: 20px;
               }
               .footer {
                   text-align: center;
                   padding: 20px 0;
                   border-top: 1px solid #eeeeee;
                   color: #aaa;
               }
               .footer p {
                   font-size: 12px;
               }
           </style>
       </head>
       <body>
           <div class="container">
               <div class="header">
                   <img src="https://res.cloudinary.com/djxavfpqc/image/upload/v1723472100/companylogo_lju2zb.png" alt="Company Logo">
               </div>
               <div class="content">
                   <h1>Email Verification</h1>
                   <p>Hi ${req.body.name},</p>
                   <p>Your email address changed successfully. Please click the button below to verify your email address:</p>
                   <a href="http://localhost:8080/api/mail/enterpriseverifymail/${token}" class="verify-button">Verify Your Email</a>
               </div>
               <div class="footer">
                   <p>If you did not update your account, please ignore this email.</p>
                   <p>&copy; 2024 Uphire. All rights reserved.</p>
               </div>
           </div>
       </body>
       </html>
       `
    }
    

    try{
       await transpoter.sendMail(mailConfigurations)
       
       res.status(200).json("Mail for verification sended successfully")
    }catch(err){
        next(err)
    }

}


//sending verification code to enterprise team member when its invited
export const sendVerificationMailEnterpriseTeam=async (req,res,next)=>{
    const token=jwt.sign(req.body,process.env.JWT)

    const mailConfigurations={
       from:{
        name:"Uphire",
        address:'vivekmesuriya110@gmail.com'
       },
       to:req.body.email,
       subject:'Uphire:Verify your email address',
       html:`<!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Email Verification</title>
           <style>
               body {
                   font-family: Arial, sans-serif;
                   background-color: #f4f4f4;
                   margin: 0;
                   padding: 0;
                   color: #333;
               }
               .container {
                   width: 100%;
                   max-width: 600px;
                   margin: 0 auto;
                   padding: 20px;
                   background-color: #ffffff;
                   border-radius: 8px;
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
               }
               .header {
                   text-align: center;
                   padding: 20px 0;
                   border-bottom: 1px solid #eeeeee;
               }
               .header img {
                   width: 80px;
               }
               .content {
                   padding: 20px 0;
                   text-align: center;
               }
               .content h1 {
                   color: #333;
               }
               .content p {
                   color: #555;
               }
               .verify-button {
                   display: inline-block;
                   padding: 10px 20px;
                   font-size: 16px;
                   color: #ffffff;
                   background-color: #007bff;
                   border-radius: 5px;
                   text-decoration: none;
                   margin-top: 20px;
               }
               .footer {
                   text-align: center;
                   padding: 20px 0;
                   border-top: 1px solid #eeeeee;
                   color: #aaa;
               }
               .footer p {
                   font-size: 12px;
               }
           </style>
       </head>
       <body>
           <div class="container">
               <div class="header">
                   <img src="https://res.cloudinary.com/djxavfpqc/image/upload/v1723472100/companylogo_lju2zb.png" alt="Company Logo">
               </div>
               <div class="content">
                   <h1>Email Verification</h1>
                   <p>Hi ${req.body.name},</p>
                   <p>You are invited to uphire platform. Please click the button below to verify your email address:</p>
                   <a href="http://localhost:8080/api/mail//enterpriseteamverifymail/${token}" class="verify-button">Verify Your Email</a>
               </div>
               <div class="footer">
                   <p>If you did not create an account, please ignore this email.</p>
                   <p>&copy; 2024 Uphire. All rights reserved.</p>
               </div>
           </div>
       </body>
       </html>
       `
    }
    

    try{
       await transpoter.sendMail(mailConfigurations)
       
       res.status(200).json("Mail for verification sended successfully")
    }catch(err){
        next(err)
    }
}


//sending verification email for recruiting agency
export const sendVerificationMailRecruiting=async (req,res,next)=>{
    const token=jwt.sign(req.body,process.env.JWT)

    const mailConfigurations={
       from:{
        name:"Uphire",
        address:'vivekmesuriya110@gmail.com'
       },
       to:req.body.email,
       subject:'Uphire:Verify your email address',
       html:`<!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Email Verification</title>
           <style>
               body {
                   font-family: Arial, sans-serif;
                   background-color: #f4f4f4;
                   margin: 0;
                   padding: 0;
                   color: #333;
               }
               .container {
                   width: 100%;
                   max-width: 600px;
                   margin: 0 auto;
                   padding: 20px;
                   background-color: #ffffff;
                   border-radius: 8px;
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
               }
               .header {
                   text-align: center;
                   padding: 20px 0;
                   border-bottom: 1px solid #eeeeee;
               }
               .header img {
                   width: 80px;
               }
               .content {
                   padding: 20px 0;
                   text-align: center;
               }
               .content h1 {
                   color: #333;
               }
               .content p {
                   color: #555;
               }
               .verify-button {
                   display: inline-block;
                   padding: 10px 20px;
                   font-size: 16px;
                   color: #ffffff;
                   background-color: #007bff;
                   border-radius: 5px;
                   text-decoration: none;
                   margin-top: 20px;
               }
               .footer {
                   text-align: center;
                   padding: 20px 0;
                   border-top: 1px solid #eeeeee;
                   color: #aaa;
               }
               .footer p {
                   font-size: 12px;
               }
           </style>
       </head>
       <body>
           <div class="container">
               <div class="header">
                   <img src="https://res.cloudinary.com/djxavfpqc/image/upload/v1723472100/companylogo_lju2zb.png" alt="Company Logo">
               </div>
               <div class="content">
                   <h1>Email Verification</h1>
                   <p>Hi ${req.body.name},</p>
                   <p>Thank you for registering with us. Please click the button below to verify your email address:</p>
                   <a href="http://localhost:8080/api/mail/recruitingverifymail/${token}" class="verify-button">Verify Your Email</a>
               </div>
               <div class="footer">
                   <p>If you did not create an account, please ignore this email.</p>
                   <p>&copy; 2024 Uphire. All rights reserved.</p>
               </div>
           </div>
       </body>
       </html>
       `
    }

    try{
       await transpoter.sendMail(mailConfigurations)
       
       res.status(200).json("Mail for verification sended successfully")
    }catch(err){
        next(err)
    }
}




//sending verification mail for recruiting agency when update mail address
export const sendEmailUpdateVerificationRecruiting=async (req,res,next)=>{

    const token=jwt.sign(req.body,process.env.JWT)

    const mailConfigurations={
       from:{
        name:"Uphire",
        address:'vivekmesuriya110@gmail.com'
       },
       to:req.body.email,
       subject:'Uphire:Verify your email address',
       html:`<!DOCTYPE html>
       <html lang="en">
       <head>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <title>Email Verification</title>
           <style>
               body {
                   font-family: Arial, sans-serif;
                   background-color: #f4f4f4;
                   margin: 0;
                   padding: 0;
                   color: #333;
               }
               .container {
                   width: 100%;
                   max-width: 600px;
                   margin: 0 auto;
                   padding: 20px;
                   background-color: #ffffff;
                   border-radius: 8px;
                   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
               }
               .header {
                   text-align: center;
                   padding: 20px 0;
                   border-bottom: 1px solid #eeeeee;
               }
               .header img {
                   width: 80px;
               }
               .content {
                   padding: 20px 0;
                   text-align: center;
               }
               .content h1 {
                   color: #333;
               }
               .content p {
                   color: #555;
               }
               .verify-button {
                   display: inline-block;
                   padding: 10px 20px;
                   font-size: 16px;
                   color: #ffffff;
                   background-color: #007bff;
                   border-radius: 5px;
                   text-decoration: none;
                   margin-top: 20px;
               }
               .footer {
                   text-align: center;
                   padding: 20px 0;
                   border-top: 1px solid #eeeeee;
                   color: #aaa;
               }
               .footer p {
                   font-size: 12px;
               }
           </style>
       </head>
       <body>
           <div class="container">
               <div class="header">
                   <img src="https://res.cloudinary.com/djxavfpqc/image/upload/v1723472100/companylogo_lju2zb.png" alt="Company Logo">
               </div>
               <div class="content">
                   <h1>Email Verification</h1>
                   <p>Hi ${req.body.name},</p>
                   <p>Your email address changed successfully. Please click the button below to verify your email address:</p>
                   <a href="http://localhost:8080/api/mail/enterpriseverifymail/${token}" class="verify-button">Verify Your Email</a>
               </div>
               <div class="footer">
                   <p>If you did not update your account, please ignore this email.</p>
                   <p>&copy; 2024 Uphire. All rights reserved.</p>
               </div>
           </div>
       </body>
       </html>
       `
    }
    

    try{
       await transpoter.sendMail(mailConfigurations)
       
       res.status(200).json("Mail for verification sended successfully")
    }catch(err){
        next(err)
    }

}




//verification recruiting agency and enterprise

export const verifyemailRecruiting=async (req,res,next)=>{
    const {token}=req.params


    jwt.verify(token,process.env.JWT,async (err,decoded)=>{
        if(err){
            return next(createError(404,"Email verification failed, possibly the link is invalid...!"))
        }else{
             console.log(decoded)
             try{
                await RECRUITING.updateOne({email:decoded.email},{$set:{email_verified:true}})
                await RECRUITINGTEAM.updateOne({email:decoded.email},{$set:{email_verified:true}})
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
                  <p style="text-align:center;">Email verification done successfully</p>
                  <a style="text-align:center;" href='http://localhost:3000/'>Go To Login</a>
                  </div>
                </body>
                </html>`)
             }catch(err){
                 next(err)
             }
            
        }
    })
}


export const verifyemailEnterprise=async (req,res,next)=>{
    const {token}=req.params


    jwt.verify(token,process.env.JWT,async (err,decoded)=>{
        if(err){
            return next(createError(404,"Email verification failed, possibly the link is invalid...!"))
        }else{
             console.log(decoded)
             try{
                await ENTERPRISE.updateOne({email:decoded.email},{$set:{email_verified:true}})
                await ENTERPRISETEAM.updateOne({email:decoded.email},{$set:{email_verified:true}})
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
                  <p style="text-align:center;">Email verification done successfully</p>
                  <a style:"text-align:center;" href='http://localhost:3000/'>Go To Login</a>
                  </div>
                </body>
                </html>`)
             }catch(err){
                 next(err)
             }
            
        }
    })
}

export const verifyemailEnterpriseTeam=async (req,res,next)=>{
    const {token}=req.params


    jwt.verify(token,process.env.JWT,async (err,decoded)=>{
        if(err){
            return next(createError(404,"Email verification failed, possibly the link is invalid...!"))
        }else{
             console.log(decoded)
             try{
                await ENTERPRISETEAM.updateOne({email:decoded.email},{$set:{email_verified:true}})
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
                  <p style="text-align:center;">Email verification done successfully</p>
                  <a style:"text-align:center;" href='http://localhost:3000/'>Go To Login</a>
                  </div>
                </body>
                </html>`)
             }catch(err){
                 next(err)
             }
            
        }
    })
}