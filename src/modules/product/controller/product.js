import {productModel} from "../../../../DB/models/product.model.js"
import slugify from "slugify";
import { asyncHandler } from "../../../utils/errorHandling.js";
import {
    NOT_FOUND,
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import { Features } from "../../../utils/features.js";
import cloudinary from "../../../utils/cloudinary.js";
import dotenv from "dotenv"
dotenv.config()

export const add_product=asyncHandler(
    async(req,res,next)=>{
       // check //
       console.log(req.user._id);
       req.body.user=req.user._id
       console.log(req.body);
       const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${req.user._id}` });
       req.body.image = { secure_url, public_id };
       console.log(req.body);
        const product=new productModel(req.body)
        await product.save()
        return res.status(201).json({message:`doone`,product})
    }
)
export const getAllproducts=asyncHandler(async(req,res,next)=>{
    let fauture=new Features(productModel.find(),req.query).paginate().fields().sort().filter().search()
    let product=await fauture.mongooseQuery
    
    return res.status(StatusCodes.OK).json({message:`done`,page:fauture.page,product})
})
export const updateProducts = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }

    const check = await productModel.findById(id);
    if (!check) {
        return next(new Error(`Product not found`, { cause: StatusCodes.NOT_FOUND }));
    }

    // Assuming req.user contains the authenticated user
    if (req.user._id.toString() !== check.user.toString()) {
        return next(new Error(`You are not authorized to update this product`, { cause: StatusCodes.FORBIDDEN }));
    }

    const product = await productModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
        return next(new Error(`Product not found after update`, { cause: StatusCodes.NOT_FOUND }));
    }

    return res.status(StatusCodes.OK).json({ message: `Done`, product });
});
export const deleteproducts=asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    console.log(id)
    const check = await productModel.findById(id);
    if (!check) {
        return next(new Error(`Product not found`, { cause: StatusCodes.NOT_FOUND }));
    }

    // Assuming req.user contains the authenticated user
    if (req.user._id.toString() !== check.user.toString()) {
        return next(new Error(`You are not authorized to update this product`, { cause: StatusCodes.FORBIDDEN }));
    }
    const product=await productModel.findByIdAndDelete(id)
    if(!product){
        return next(new Error(`this product not found`,{cause:StatusCodes.NOT_FOUND}))
    }
    return res.status(StatusCodes.OK).json({message:`deleted`,product})
})
export const get_productBYId=asyncHandler(async(req,res,next)=>{
    const{id}=req.params
    const product=await productModel.findById(id)
    if(!product){
        return next (new Error(`canot find `),{cause:StatusCodes.NOT_FOUND})
    }
    return res.status(StatusCodes.OK).json(`donne`,product)
})