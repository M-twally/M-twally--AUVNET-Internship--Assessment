import { customAlphabet } from "nanoid";

export const generateOTPCode = ()=>{
    const code= customAlphabet(process.env.ALPHABET_OTP, 4); 
    return code();
}
export const getExpirationTimestamp =()=>{
    const now = new Date();
    now.setMinutes(now.getMinutes() + 2);
    return now;
}

export const checkValidationCode = (codeExpireTime)=>{
    const now = new Date();
    if(now > codeExpireTime){
        return false
    }
    return true;
}