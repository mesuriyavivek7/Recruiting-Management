import RECRUITING from '../models/RECRUITING.js'
import ENTERPRISE from '../models/ENTERPRISE.js'
import RECRUITINGTEAM from '../models/RECRUITINGTEAM.js'
import ENTERPRISETEAM from '../models/ENTERPRISETEAM.js'
import RESUMEDOCS from '../models/RESUMEDOCS.js'
import CANDIDATE from '../models/CANDIDATE.js'
import CANDIDATEBASICDETAILS from '../models/CANDIDATEBASICDETAILS.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import fs, { stat } from 'fs'
import JOBBASICDETAILS from '../models/JOBBASICDETAILS.js'
import bcrypt from 'bcryptjs'


// Function to generate the HTML template
const generateEmailHTML = (resumedetails) => {
    // Generate HTML for each candidate
    let candidatesHTML = '';
    resumedetails.forEach(resume => {
      candidatesHTML += `
        <div class="candidate">
          <h2>Candidate Name: ${resume.candidate_name}</h2>
          <p>Applied Position: ${resume.job_title}</p>
          <p><a href="${process.env.APP_URL}/resumedocs/${resume.filename}" class="btn">View Resume</a></p>
        </div>
      `;
    });
  
    // Full HTML email
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #dddddd; padding: 20px; box-sizing: border-box; }
          h1 { color: #333333; font-size: 24px; text-align: center; }
          p { font-size: 16px; color: #555555; }
          .candidate-list { margin: 20px 0; }
          .candidate { background-color: #f9f9f9; padding: 15px; border: 1px solid #dddddd; margin-bottom: 10px; border-radius: 5px; }
          .candidate h2 { font-size: 18px; margin: 0; color: #333333; }
          .candidate p { margin: 5px 0; font-size: 14px; color: #666666; }
          .btn { display: inline-block; background-color: #28a745; color: white; padding: 10px 20px; text-align: center; text-decoration: none; border-radius: 5px; font-size: 16px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #888888; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Candidate Resumes for Your Review</h1>
          <p>Dear Hiring Manager,</p>
          <p>Please find below the details of candidates who have applied for various positions:</p>
          <div class="candidate-list">
            ${candidatesHTML}
          </div>
          <p>If you have any questions or require further information, please feel free to reach out.</p>
          <p>Best Regards,<br>Recruitment Team</p>
          <div class="footer">
            <p>&copy; 2024 Uphire | All Rights Reserved</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  


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


export const shareResumeWithHiringManager=async (req,res,next)=>{
      try{
        const {emails,ciddata}=req.body

        const resumedetails=await Promise.all(ciddata.map(async (cid)=>{
            const cuser=await CANDIDATE.findById(cid,{candidate_id:1,_id:0})
            const candidatebasicdetails=await CANDIDATEBASICDETAILS.findOne({candidate_id:cuser.candidate_id})
            const resume=await RESUMEDOCS.findOne({candidate_id:cuser.candidate_id},{filepath:1,job_id:1,filename:1,_id:0})
            const jobbasicdetails=await JOBBASICDETAILS.findOne({job_id:resume.job_id})
            return (
                {
                    filepath:resume.filepath,
                    filename:resume.filename,
                    candidate_name:`${candidatebasicdetails.first_name} ${candidatebasicdetails.last_name}`,
                    job_title:jobbasicdetails.job_title
                }
            )
        }))

        const hiringmanageremails=emails.join(',')
        let mailOption={
             from:{
                name:'uphire',
                address:'vivekmesuriya110@gmail.com'
             },
             to:hiringmanageremails,
             subject:'Review the candidates',
             html:generateEmailHTML(resumedetails)
        }

        let info=await transpoter.sendMail(mailOption)

        res.status(200).json(`mail sended successfully Response ${info.response}`)
      }catch(err){
        next(err)
      }
}

export const sendBulkMail=async (req,res,next)=>{
     try{
        let attachments=null
        if(req.file){
           attachments={
            filename:req.file.originalname,
            path:req.file.path
           }
        }
        
        const mailpreq=req.body

        let mailOption={
            from:{
                name:"uphire",
                address:"vivekmesuriya110@gmail.com"
            },
            to:mailpreq.email,
            subject:mailpreq.subject,
            ...(mailpreq.cc && {cc:mailpreq.cc}),
            ...(attachments && {attachments}),
            html:`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <title>Email Template</title>
                <style>
                    /* General styling */
                    body {
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                        font-family: Arial, sans-serif;
                    }
            
                    table {
                        border-spacing: 0;
                        width: 100%;
                        max-width: 600px;
                        margin: 0 auto;
                    }
            
                    table td {
                        padding: 20px;
                    }
            
                    /* Container */
                    .email-container {
                        background-color: #ffffff;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
                    }
            
                    /* Header */
                    .email-header {
                        background-color: #007BFF;
                        color: white;
                        padding: 40px 20px;
                        text-align: center;
                    }
            
                    .email-header h1 {
                        margin: 0;
                        font-size: 24px;
                    }
            
                    /* Body */
                    .email-body {
                        padding: 20px;
                        color: #333333;
                        line-height: 1.6;
                    }
            
                    .email-body h2 {
                        margin-top: 0;
                    }
            
                    /* Button */
                    .cta-button {
                        background-color: #28a745;
                        color: white;
                        text-decoration: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        display: inline-block;
                    }
            
                    /* Footer */
                    .email-footer {
                        background-color: #f4f4f4;
                        color: #666666;
                        padding: 20px;
                        text-align: center;
                        font-size: 12px;
                    }
            
                    /* Responsive */
                    @media only screen and (max-width: 600px) {
                        .email-header, .email-body, .email-footer {
                            padding: 10px;
                        }
            
                        .email-header h1 {
                            font-size: 20px;
                        }
            
                        .cta-button {
                            width: 100%;
                            text-align: center;
                            padding: 15px 0;
                        }
                    }
                </style>
            </head>
            <body>
                <table class="email-container">
                    <!-- Header -->
                    <tr>
                        <td class="email-header">
                            <h1>Uphire</h1>
                        </td>
                    </tr>
            
                    <!-- Body -->
                    <tr>
                        <td class="email-body">
                            <p>${mailpreq.message}</p>
                            <p>For any further queries and problame contact to acmanager ${mailpreq.ac_name && mailpreq.ac_name}.</p>
                            <label for="">Email:</label><span>${mailpreq.ac_email && mailpreq.ac_email}</span>
                        </td>
                        
                    </tr>
                    
            
                    <!-- Footer -->
                    <tr>
                        <td class="email-footer">
                            <p>&copy; 2024 UPHIRE. All rights reserved.</p>
                            <p>This email was sent from enterprise. If you don't want to receive these emails, you can <a href="#">unsubscribe</a>.</p>
                        </td>
                    </tr>
                </table>
            </body>
            </html>`
        }
        
        let info=await transpoter.sendMail(mailOption)
        res.status(200).json(`Mail sent successfully. Response ${info.response}`)
     }catch(err){
        next(err)
     }finally{
        if(req.file){
           fs.unlinkSync(req.file.path)
        }
     }
}

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
                    width: 90%;
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #4CAF50;
                    padding: 15px;
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
                    font-size: 1.8rem;
                }
                .content p {
                    line-height: 1.6;
                    font-size: 1rem;
                }
                .cred-data {
                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;
                    margin-bottom: 0.5rem;
                }
                .cred-data span {
                    word-wrap: break-word;
                }
                .footer {
                    text-align: center;
                    padding: 15px;
                    font-size: 0.8rem;
                    color: #888888;
                }
        
                /* Responsive styles */
                @media (max-width: 480px) {
                    .content h1 {
                        font-size: 1.5rem;
                    }
                    .content p {
                        font-size: 0.9rem;
                    }
                    .header {
                        padding: 10px;
                    }
                    .footer {
                        font-size: 0.7rem;
                    }
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
                    <p>You are now a part of the fastest-growing network of recruiting firms in the world.
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
                    width: 90%;
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #4CAF50;
                    padding: 15px;
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
                    font-size: 1.8rem;
                    margin-bottom: 10px;
                }
                .content p {
                    line-height: 1.6;
                    font-size: 1rem;
                    margin-bottom: 15px;
                }
                .cred-data {
                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;
                    margin-bottom: 1rem;
                }
                .cred-data span {
                    word-wrap: break-word;
                }
                .footer {
                    text-align: center;
                    padding: 15px;
                    font-size: 0.8rem;
                    color: #888888;
                }
        
                /* Responsive styles */
                @media (max-width: 480px) {
                    .content h1 {
                        font-size: 1.5rem;
                    }
                    .content p {
                        font-size: 0.9rem;
                    }
                    .header {
                        padding: 10px;
                    }
                    .footer {
                        font-size: 0.75rem;
                    }
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
                    <p>You are invited to UPHIRE by your friend ${mailpreq.inviter_name}. Your account has been created successfully.</p>
                    <p>You are now a part of the fastest-growing network of recruiting firms in the world. Your credentials for accessing the UPHIRE platform are given below:</p>
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
                   width: 90%;
                   max-width: 600px;
                   margin: 20px auto;
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
                   padding: 20px;
                   text-align: center;
               }
               .content h1 {
                   color: #333;
                   font-size: 1.8rem;
               }
               .content p {
                   color: #555;
                   font-size: 1rem;
                   margin-bottom: 20px;
               }
               .verify-button {
                   display: inline-block;
                   padding: 10px 20px;
                   font-size: 1rem;
                   color: #ffffff;
                   background-color: #007bff;
                   border-radius: 5px;
                   text-decoration: none;
                   margin-top: 20px;
               }
               .footer {
                   text-align: center;
                   padding: 20px;
                   border-top: 1px solid #eeeeee;
                   color: #aaa;
               }
               .footer p {
                   font-size: 0.9rem;
                   line-height: 1.6;
               }
       
               /* Responsive Styles */
               @media (max-width: 480px) {
                   .content h1 {
                       font-size: 1.5rem;
                   }
                   .content p {
                       font-size: 0.9rem;
                   }
                   .verify-button {
                       padding: 12px 18px;
                       font-size: 0.95rem;
                   }
                   .footer p {
                       font-size: 0.8rem;
                   }
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
                   <a href="${process.env.APP_SERVER_URL}/mail/enterpriseverifymail/${token}" class="verify-button">Verify Your Email</a>
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
       
               /* Media Queries for Responsiveness */
               @media only screen and (max-width: 600px) {
                   .container {
                       padding: 15px;
                   }
                   .content h1 {
                       font-size: 22px;
                   }
                   .content p {
                       font-size: 14px;
                   }
                   .verify-button {
                       padding: 10px 15px;
                       font-size: 14px;
                   }
                   .header img {
                       width: 60px;
                   }
               }
       
               @media only screen and (max-width: 400px) {
                   .content h1 {
                       font-size: 18px;
                   }
                   .content p {
                       font-size: 12px;
                   }
                   .verify-button {
                       padding: 8px 12px;
                       font-size: 12px;
                   }
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
                   <p>You are invited to Uphire platform. Please click the button below to verify your email address:</p>
                   <a href="${process.env.APP_SERVER_URL}/mail/enterpriseteamverifymail/${token}" class="verify-button">Verify Your Email</a>
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
                   font-size: 24px;
               }
               .content p {
                   color: #555;
                   font-size: 16px;
                   margin: 10px 0;
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
               /* Responsive styles */
               @media only screen and (max-width: 600px) {
                   .container {
                       padding: 15px;
                   }
                   .content h1 {
                       font-size: 20px;
                   }
                   .content p {
                       font-size: 14px;
                   }
                   .verify-button {
                       font-size: 14px;
                       padding: 8px 16px;
                   }
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
                   <a href="${process.env.APP_SERVER_URL}/mail/recruitingverifymail/${token}" class="verify-button">Verify Your Email</a>
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

//sending verification mail for recruiting agency team memeber
export const sendVerificationMailRecruitingTeam=async (req,res,next)=>{
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
                   <a href="${process.env.APP_SERVER_URL}/mail/recruitingteamverifymail/${token}" class="verify-button">Verify Your Email</a>
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
                   <a href="${process.env.APP_SERVER_URL}/mail/enterpriseverifymail/${token}" class="verify-button">Verify Your Email</a>
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

//Sending verification mail when user change his email address
export const sendEmailUpdateVerificaitonRecruiting=async (req,res,next)=>{
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
                   font-size: 24px;
               }
               .content p {
                   color: #555;
                   font-size: 16px;
                   margin: 10px 0;
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
               /* Responsive styles */
               @media only screen and (max-width: 600px) {
                   .container {
                       padding: 15px;
                   }
                   .content h1 {
                       font-size: 20px;
                   }
                   .content p {
                       font-size: 14px;
                   }
                   .verify-button {
                       font-size: 14px;
                       padding: 8px 16px;
                   }
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
                   <a href="${process.env.APP_SERVER_URL}/mail/recruitingverifymail/${token}" class="verify-button">Verify Your Email</a>
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
                  <a style="text-align:center;" href='${process.env.CLIENT_URL}'>Go To Login</a>
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
                  <a style:"text-align:center;" href='${process.env.CLIENT_URL}'>Go To Login</a>
                  </div>
                </body>
                </html>`)
             }catch(err){
                 next(err)
             }
            
        }
    })
}

//verify mail for recruiting agency team member

export const verifyemailRecruitingTeam=async (req,res,next)=>{
    const {token}=req.params


    jwt.verify(token,process.env.JWT,async (err,decoded)=>{
        if(err){
            return next(createError(404,"Email verification failed, possibly the link is invalid...!"))
        }else{
             console.log(decoded)
             try{
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
                  <a style:"text-align:center;" href='${process.env.CLIENT_URL}'>Go To Login</a>
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
                  <a style:"text-align:center;" href='${process.env.CLIENT_URL}'>Go To Login</a>
                  </div>
                </body>
                </html>`)
             }catch(err){
                 next(err)
             }
            
        }
    })
}

//For sending mail of reset password
export const requestResetPassword=async (req,res,next)=>{
    const {email,userType}=req.body
   try{
     let user=null
     if(userType==='enterprise') user=await ENTERPRISETEAM.findOne({email})
     else user=await RECRUITINGTEAM.findOne({email})
     
     if(!user) return res.status(404).json({message:"User not found by this email address",type:"failure"})

     //Create token with userid and expiration
     const token= jwt.sign({id:user._id},process.env.JWT,{expiresIn:'24h'})
     const resetLink=`${process.env.CLIENT_URL}/reset-password/${token}/${userType}`


     //Send email with reset link
     const mailConfigurations={
        from:{
         name:"Uphire",
         address:'vivekmesuriya110@gmail.com'
        },
        to:email,
        subject:"Uphire, Reset Password",
        html:`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Reset Your Password</title>
          <style>
            /* General reset for mobile */
            body, table, td, a {
              text-size-adjust: 100%;
              font-family: Arial, sans-serif;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            /* Layout */
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 10px;
              background-color: #4CAF50;
              color: #ffffff;
              border-top-left-radius: 5px;
              border-top-right-radius: 5px;
            }
            .content {
              padding: 20px;
              text-align: center;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              margin-top: 20px;
              background-color: #4CAF50;
              color: #ffffff !important;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #777;
              padding: 10px;
              margin-top: 20px;
            }
        
            /* Responsive adjustments */
            @media only screen and (max-width: 600px) {
              .container {
                width: 100% !important;
                padding: 10px !important;
              }
              .content {
                padding: 10px !important;
              }
              .button {
                padding: 15px 25px !important;
                font-size: 16px !important;
              }
              .footer {
                font-size: 12px !important;
              }
            }
          </style>
        </head>
        <body style="background-color: #f7f7f7; margin: 0; padding: 0;">
        
          <table role="presentation" class="container" cellpadding="0" cellspacing="0">
            <tr>
              <td class="header">
                <h2>Password Reset Request</h2>
              </td>
            </tr>
            <tr>
              <td class="content">
                <p>Hello,</p>
                <p>We received a request to reset your password. Click the button below to set a new password.</p>
                <a href="${resetLink}" class="button">Reset Password</a>
                <p>If you didn't request this, you can safely ignore this email.</p>
                <p>Best regards, Uphire Team</p>
              </td>
            </tr>
            <tr>
              <td class="footer">
                <p>&copy; 2024 Uphire. All rights reserved.</p>
              </td>
            </tr>
          </table>
        
        </body>
        </html>`
     }

     transpoter.sendMail(mailConfigurations)

     res.status(200).json({message:"Successfully reset password mail sended",type:'success'})

   }catch(err){
     next(err)
   }
}

//Route for verify token of reset password
export const verifyResetPassword=async (req,res,next)=>{
     try{
        const {token,usertype}=req.params
        const {newPassword}=req.body

        let userId=null
        jwt.verify(token,process.env.JWT,async (err,decoded)=>{
            if(err) return res.status(404).json({message:"Invalid token"})
            else userId=decoded.id
        })
       
        let user=null
        if(usertype==="enterprise") user=await ENTERPRISETEAM.findById(userId)
        else user=await RECRUITINGTEAM.findById(userId)

        
        if(!user) return res.status(404).json({message:"Invalid token or User not found",type:"failure"})

        //Hash the new password and update
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword=await bcrypt.hash(newPassword,salt)

        //Update the password
        if(usertype==="enterprise"){
          await ENTERPRISETEAM.findByIdAndUpdate(user._id,{password:hashedPassword})
        }else{
          await RECRUITINGTEAM.findByIdAndUpdate(user._id,{password:hashedPassword})
        }
       
        res.status(200).json({message:"Successfully user password changed",type:"success"})

     }catch(err){ 
        next(err)
     }
}