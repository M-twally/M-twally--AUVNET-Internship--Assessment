import { StatusCodes } from "http-status-codes";
import {userModel} from "../../../../DB/models/user.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import {
    generateOTPCode,
    getExpirationTimestamp,
    checkValidationCode,
} from "../../../utils/codeOTP.js";
import send_Email from "../../../utils/email.js";
import dotenv from "dotenv"
dotenv.config()


export const sendEmailOTP = asyncHandler(async (req, res, next) => {

    const { email } = req.body;

    // Check if the email exists in the database
    const user = await userModel.findById({ _id: req.user._id });
    if (!user) {
        return next(new Error("User Not Found!"));
    }
    // Check if the email is already confirmed
    if (user.confirmEmail==true) {
        return next(new Error('Email Already Confirmed!'));
    }

    // Generate a verification code
    const code = generateOTPCode();
    console.log(code);

    // Create an OTP message 
    const OTPMessage = `Your verification code is: ${code}`;
    console.log(OTPMessage);
    await send_Email({ to: email, subject: 'Email Verification', text: OTPMessage });
    const expire = getExpirationTimestamp(); 
    await userModel.findOneAndUpdate({ _id: req.user._id }, { emailCode: code, emailCodeExpire: expire,email:email });

    return res.status(200).json({ message: 'Verification code sent successfully!' });
})

export const confirmEmail = asyncHandler(async (req, res, next) => {
    const {  code } = req.body;
    const email=req.user.email

    // Check if the email exists in the database
    const user = await userModel.findOne({ email } );
    if (!user) {
        return next(new Error(`Email "${email}" not found!`));
    }

    if (user.confirmEmail) {
        return next(new Error('Email Already Confirmed!'));
    }

    // Check if the verification code matches

    if (code != user.emailCode) {
        return next(new Error('Invalid code!'));
    }

    // Check if the verification code has expired
    if (!checkValidationCode(user.emailCodeExpire)) {
        return next(new Error('Verification code expired!'));
    }

    // Generate a new verification code
    const newcode = generateOTPCode();

    // Update confirm email to true
    await userModel.updateOne({ email }, { emailCode: newcode, confirmEmail: true });

    return res.status(200).json({ message: 'Email confirmed successfully!' });
});