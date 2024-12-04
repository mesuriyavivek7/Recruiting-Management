import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

let transpoter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_APP_PASS

    }
})

export const sendMail = async (req, res) => {
    const { fullName, email, password } = req.body

    let mailOption = {
        from: {
            name: "UpHire",
            address: 'vivekmesuriya110@gmail.com'
        },
        to: email,
        subject: "Invitation to Join Uphire as an Account Manager",
        html: `<!DOCTYPE html>
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
                    font-size: 24px;
                }
                .content p {
                    line-height: 1.6;
                    font-size: 16px;
                    margin: 10px 0;
                }
                .cred-data {
                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;
                    margin-bottom: 0.5rem;
                }
                .cred-data span {
                    display: inline-block;
                }
                .footer {
                    text-align: center;
                    padding: 20px;
                    font-size: 12px;
                    color: #888888;
                }
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
                    .cred-data {
                        gap: 0.2rem;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>You are invited for Account Manager Role.</h1>
                </div>
                <div class="content">
                    <h1>Welcome to UPHIRE,</h1>
                    <p>Dear ${fullName},</p>
                    <p>I hope this message finds you well. Your account has been created successfully.</p>
                    <p>I am pleased to invite you to join our team at Uphire as an Account Manager. Your skills and experience make you an excellent fit for this role, and we are excited about the value you will bring to our organization.</p>
                    <div>
                       <p>Credentials For Uphire Dashboard:</p>
                       <div class="cred-data">
                         <span>Email:</span>
                         <span style="color:blue;">${email}</span>
                       </div>
                       <div class="cred-data">
                         <span>Password:</span>
                         <span>${password}</span>
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

    transpoter.sendMail(mailOption, (error, info) => {
        if (error) {
            console.log(error)
            res.status(402).send('there is something wrong')
        }
        res.status(200).send(`mail sended successfully `)
    })
}
