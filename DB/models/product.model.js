
import { Schema,model } from "mongoose";
const productschema=new Schema({
 
    user:{
        type:Schema.ObjectId,
        ref:"user", 
        required:true,
    },
    title:{
        type:String,
        required:true,
        uniqe:true,
        trim:true,
        minlength:[20,"too shoort product name"]
    },
    slug:{
        type:String,
        lowercase:true,
    },
   price:{
    type:Number,
    default:0,
    min:0,
   },
   priceAfterDiscount:{
    type:Number,
    default:0,
    min:0,
   },
   description:{
    type:String,
    maxlength:[100,`should be less than 100`],
    minlength:[2,`should be more than 2`],
    required:true,
    trim:true,
   },
   stock:{
    type:Number,
    default:0,
    min:0,

   },
   sold:{
    type:Number,
    default:0,
    min:0,

   },
   category:{
    type:Schema.ObjectId,
    ref:"category",
    required:true,
   },
   subcategory:{
    type:Schema.ObjectId,
    ref:"subcategory",
    required:true
   },
   brand:{
    type:Schema.ObjectId,
    ref:"brand",
    required:true,
   },
   ratingAvg:{
    type:Number,
    min:1,
    max:5,
    
   },
   ratingCount:{
    type:Number,
    min:0,
   },
   image: {
    secure_url: {
        type: String
    },
    public_id: {
        type: String
    }
},
},{
    timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}
})

productschema.virtual(`myReviews`,{
    ref:`review`,
    localField:`_id`,
    foreignField:`product`

})
productschema.pre(/^find/,function(){
    this.populate(`myReviews`)
})

export const productModel=model(`product`,productschema)