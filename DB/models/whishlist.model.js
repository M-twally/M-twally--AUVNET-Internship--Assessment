import mongoose, { Schema, model } from "mongoose";

const wishlistSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    wishlistItems: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'product',
            required: true,
        },
    }],
}, { timestamps: true });

export const wishlistModel = model('wishlist', wishlistSchema);
