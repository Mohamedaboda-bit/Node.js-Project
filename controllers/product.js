import { catchAsync } from "../Utlites/wrapperFunction.js";
import Product from "../models/product.js";

export const getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        status: "success",
        results: products.length,
        data: { products },
    });
});

export const getOneProduct = catchAsync(async (req, res, next) => {
    const { name } = req.params;

    const product = await Product.findOne({});

    if (!product) {
        return next(new Error("No product found with that ID"));
    }

    res.status(200).json({
        status: "success",
        data: { product },
    });
});

export const searchProducts = catchAsync(async (req, res, next) => {
    const { productName, sellerName } = req.query;

    let query = {};
    
    if (productName) {
        query.name = { $regex: productName, $options: 'i' }; 
    }

    let productQuery = Product.find(query);

    if (sellerName) {
        productQuery = productQuery.populate({
            path: 'sellerId',
            match: { name: { $regex: sellerName, $options: 'i' } } // Case-insensitive search for seller name
        });
    } else {
        productQuery = productQuery.populate('sellerId');
    }

    const products = await productQuery;

    const filteredProducts = sellerName 
        ? products.filter(product => product.sellerId !== null)
        : products;

    if (filteredProducts.length === 0) {
        return next(new Error("No products found matching the criteria"));
    }

    res.status(200).json({
        status: "success",
        results: filteredProducts.length,
        data: { products: filteredProducts },
    });
});