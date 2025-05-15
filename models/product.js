import mongoose  from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    imageUrl: {
        type: String,
        required: [true, "Product image URL is required"],
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Seller ID is required"],
    },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;