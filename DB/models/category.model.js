import { Schema,model } from "mongoose";
const categoryschema=new Schema({
    name:{
        type:String,
        required:true,
        uniqe:true,
        trim:true,
        minlength:[2,`to shoort category name`]

    },
    slug:{
        type:String,
        lowercase:true,
    },
    image:{
        type:String,
        // required:true,
    }
},{
    timestamps:true,
})


export const categoryModel=model(`category`,categoryschema)