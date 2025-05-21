import { catchAsync } from "../Utlites/wrapperFunction.js";
import Product from "../models/product.js";

export const Add_product = catchAsync(async (req, res, next) => {
    const { name, description } = req.body;
    const sellerId = req.user?.id; 
    const imageUrl=req.file.path;

    if (!sellerId) {
        return next(new Error("Authentication required"));
    }

    
    console.log(imageUrl)
    const product = await Product.create({
        name,
        description,
        imageUrl,
        sellerId,
    });

    res.status(201).json({
        status: "success",
        data: { product },
    });
});

export const Update_product = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const { name, description } = req.body;

    const sellerId = req.user?.id;

    if (!sellerId) {
        return next(new Error("Authentication required"));
    }

    let seller_id = await Product.findById({_id:id}).select('sellerId')
    if(!seller_id){
        return next(new Error("No product found with that ID or unauthorized"));
    }

    seller_id = seller_id.sellerId.toString()

    if(sellerId!=seller_id){
        return next(new Error("you are not allowed to delete other sellers products"));
    }

    const product = await Product.findOneAndUpdate(
        { _id: id, sellerId },
        { name, description },
        { new: true, runValidators: true }
    );

    if (!product) {
        return next(new Error("No product found with that ID or unauthorized"));
    }

    res.status(200).json({
        status: "success",
        data: { product },
    });
});

export const Delete_product = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const sellerId = req.user.id;

    if (!sellerId) {
        return next(new Error("Authentication required"));
    }

    let seller_id = await Product.findById({_id:id}).select('sellerId')
    if(!seller_id){
        return next(new Error("No product found with that ID or unauthorized"));
    }

    seller_id = seller_id.sellerId.toString()

    if(sellerId!=seller_id){
        return next(new Error("you are not allowed to delete other sellers products"));
    }

    const product = await Product.findOneAndDelete({ _id: id });

    if (!product) {
        return next(new Error("No product found with that ID or unauthorized"));
    }

    res.status(204).json({
        status: "success",
        data: "success",
    });
});

export const Get_all_products = catchAsync(async (req, res, next) => {
    const sellerId = req.user?.id;

    if (!sellerId) {
        return next(new Error("Authentication required"));
    }

    const products = await Product.find({ sellerId }).populate("sellerId", "name email");

    res.status(200).json({
        status: "success",
        results: products.length,
        data: { products },
    });
});