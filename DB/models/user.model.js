import mongoose, { Schema, model } from 'mongoose';
// import bcrypt from "bcrypt"

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Common fields for all roles
    role: {
        type: String,
        enum: ['admin','user'],
    },
    confirmEmail: {
        type: Boolean,
        default: false,
      },
      emailCodeExpire:{
        type: Date,
      },
      emailCode: {
        type: String,
        minlength: 4,
        maxlength: 4,
      },

}, {
    timestamps: true,
});

// userSchema.pre(`save`,function(){
//     this.password=bcrypt.hashSync(this.password,parseInt(process.env.SALT_ROUND))
    
// })

export const userModel = model('User', userSchema);
