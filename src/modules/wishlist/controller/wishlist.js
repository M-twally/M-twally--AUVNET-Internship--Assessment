import { wishlistModel } from "../../../../DB/models/whishlist.model.js";
import { productModel } from "../../../../DB/models/product.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import {
    NOT_FOUND,
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
//cout lol
import {Features} from "../../../utils/features.js"


// export const addToWishlist = asyncHandler(
//     async (req, res, next) => {
//         const { product } = req.body;
//         console.log(product);
        

//         // Check if the product exists
//         let productExist = await productModel.findById(product).select('_id');
//         if (!productExist) {
//             return next(new Error('This product was not found', { cause: 404 }));
//         }

//         // Check if the user already has a wishlist
//         let existWishlist = await wishlistModel.findOne({ user: req.user._id });

//         if (!existWishlist) {
//             // If no wishlist exists, create one
//             const wishlist = new wishlistModel({
//                 user: req.user._id,
//                 wishlistItems: [{ product }]
//             });
//             await wishlist.save();
//             return res.status(201).json({ message: 'Wishlist created and product added', wishlist });
//         }

//         // Check if the product is already in the wishlist
//         let item = existWishlist.wishlistItems.find(elm => elm.product.toString() === product);

//         if (item) {
//             return res.status(400).json({ message: 'Product already exists in the wishlist' });
//         } else {
//             // If the product is not in the wishlist, add it
//             existWishlist.wishlistItems.push({ product });
//         }

//         await existWishlist.save();
//         return res.status(201).json({ message: 'Product added to wishlist', wishlist: existWishlist });
//     }
// );


export const addToWishlist = asyncHandler(
    async (req, res, next) => {
        const { wishlistItems } = req.body;

        if (!wishlistItems || !Array.isArray(wishlistItems) || wishlistItems.length === 0) {
            return next(new Error('No products provided', { cause: 400 }));
        }

        // Check if each product in the request exists in the product collection
        for (const item of wishlistItems) {
            const { product } = item;
            
            let productExist = await productModel.findById(product).select('_id');
            if (!productExist) {
                return next(new Error(`Product ${product} not found`, { cause: 404 }));
            }
        }

        // Check if the user already has a wishlist
        let existWishlist = await wishlistModel.findOne({ user: req.user._id });

        if (!existWishlist) {
            // If no wishlist exists, create one
            const wishlist = new wishlistModel({
                user: req.user._id,
                wishlistItems: wishlistItems
            });
            await wishlist.save();
            return res.status(201).json({ message: 'Wishlist created and products added', wishlist });
        }

        //  if any products are already in the wishlist
        let alreadyExistsProducts = [];

        // Add products to the existing wishlist 
        for (const item of wishlistItems) {
            const { product } = item;
            let existingItem = existWishlist.wishlistItems.find(elm => elm.product.toString() === product);

            if (existingItem) {
                alreadyExistsProducts.push(product);
            } else {
                existWishlist.wishlistItems.push({ product });
            }
        }

        if (alreadyExistsProducts.length > 0) {
            return res.status(400).json({ 
                message: `Some products already exist in the wishlist`
            });
        }

        await existWishlist.save();
        return res.status(201).json({ message: 'Products added to wishlist', wishlist: existWishlist });
    }
);

export const updateWishlist = asyncHandler(
    async (req, res, next) => {
        const { product, newProduct } = req.body;

        if (!product || !newProduct) {
            return next(new Error('Both product and newProduct fields are required', { cause: 400 }));
        }

        // Check if the new product exists
        let newProductExist = await productModel.findById(newProduct).select('_id');
        if (!newProductExist) {
            return next(new Error('The new product was not found', { cause: 404 }));
        }

        // Find the user's wishlist
        let wishlist = await wishlistModel.findOne({ user: req.user._id });
        if (!wishlist) {
            return next(new Error('Wishlist not found', { cause: 404 }));
        }

        // Find the product to be updated in the wishlist
        let itemIndex = wishlist.wishlistItems.findIndex(elm => elm.product.toString() === product);
        if (itemIndex === -1) {
            return next(new Error('Product not found in the wishlist', { cause: 404 }));
        }

        // Check if the new product is already in the wishlist to avoid duplicates
        let newProductInWishlist = wishlist.wishlistItems.find(elm => elm.product.toString() === newProduct);
        if (newProductInWishlist) {
            return next(new Error('The new product is already in the wishlist', { cause: 400 }));
        }

        // Update the product in the wishlist
        wishlist.wishlistItems[itemIndex].product = newProduct;
        await wishlist.save();

        return res.status(200).json({ message: 'Wishlist updated successfully', wishlist });
    }
);


export const deleteFromWishlist = asyncHandler(
    async (req, res, next) => {
        const { product } = req.body;

        if (!product) {
            return next(new Error('Product field is required', { cause: 400 }));
        }

        // Find the user's wishlist
        let wishlist = await wishlistModel.findOne({ user: req.user._id });
        if (!wishlist) {
            return next(new Error('Wishlist not found', { cause: 404 }));
        }

        // Check if the product is in the wishlist
        let itemIndex = wishlist.wishlistItems.findIndex(elm => elm.product.toString() === product);
        if (itemIndex === -1) {
            return next(new Error('Product not found in the wishlist', { cause: 404 }));
        }

        // Remove the product from the wishlist
        wishlist.wishlistItems.splice(itemIndex, 1);
        await wishlist.save();

        return res.status(200).json({ message: 'Product removed from wishlist', wishlist });
    }
);
