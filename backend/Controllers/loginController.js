require('dotenv').config();
const loginSchema = require("../models/loginModel");
const express = require('express');
const nodemailer = require('nodemailer');

let generatedOtp = 0;

const mailSender = async (req, res) => {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000);
        generatedOtp = otp;
        console.log(req.body);
        console.log("hello");
        
        // let userEmail = req.body.email;
        // if (req.body.username === "22a91a61a2") {
            userEmail = "vinaykishore2512@gmail.com";
        // }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: "Verify Your Email!",
            html: `<h2>Welcome to Aditya Transport Hub</h2><h3>Your <b>OTP to access ATH is:</h3><h1>${otp}</h1>`
        };

        await transporter.sendMail(mailOptions);

        // Sending OTP to the frontend as well
        return res.status(200).json({ message: "OTP sent successfully", otp });

    } catch (error) {
        return res.status(500).json({ error: "Failed to send OTP", details: error.message });
    }
};

const otpValidation = async (req, res) => {
    return res.status(200).json({ generatedOtp });
};


const getLoginDetails = async(req,res) => {
    try{
        const user = req.body;
        const loginDetails = await loginSchema.findOne({userName : user.userName , password : user.password});
        console.log(loginDetails)
        if(loginDetails){
            const sendData = {
                "userName": loginDetails.userName,
                "buildingId": loginDetails.buildingId,
                "role": loginDetails.role,
              };
              res.status(200).json(sendData);
        }
        res.status(200).json(loginDetails)
    }
    catch(err){
        console.error(err);
    }
}

exports.getLoginDetails = getLoginDetails;
exports.mailSender = mailSender;
exports.otpValidation = otpValidation;