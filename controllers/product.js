import {catchAsync} from "../Utlites/wrapperFunction.js";
// imprt mongose schemas here
import productModel from "../models/product.js"
export const getAllProducts = catchAsync(async (req, res, next) => {   
let product = await productModel.find()
    res.status(200).json({
        status: "success",
        data: product,
    });})

export const getOneProduct = catchAsync(async (req, res, next) => {   
 const { id } = req.params;
    let product = await productModel.findOne({ _id: id });

    if (product) {
        res.status(200).json({
            status: "success",
            data: product,
            
        });
    } else {
        next(AppError(404,"product not found"))
       
    }})
export const createProduct = catchAsync(async (req, res, next) => {   
let newProduct= req.body;

    const product = await productModel.create(newProduct);

    res.status(201).json({
        status: "success",
        message: "saved successfully",
        data: product,
    
    });})