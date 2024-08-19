
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

    const {fullName,email,password}=req.body

    let mailOption={
        from:{
            name:"UpHire",
            address:'vivekmesuriya110@gmail.com'
        },
        to:email,
        subject:"For account manager access",
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
                    <p>Dear ${fullName},</p>
                    <p>Thank you for registering with us. Your account has been created successfully.</p>
                    <p>You are now a part of the fastest-growing network of Recruiting firms in the world.
                        Your credentials for accessing the UPHIRE platform are given below.</p>
                    <div>
                       <div class="cred-data">
                         <span>Username:</span>
                         <span style="color:blue;">${email}</span>
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
   

        res.status(200).send(`mail sended successfully `)
    })
    

    
}
