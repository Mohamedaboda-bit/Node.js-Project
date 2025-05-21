import { catchAsync } from "../Utlites/wrapperFunction.js";
import Order from "../models/order.js";

export const getAllOrders = catchAsync(async (req, res, next) => {
    const userId = req.user?.id; 

    if (!userId) {
        return next(new Error("Authentication required"));
    }

    const orders = await Order.find({ userId })
        .populate("userId", "name email")
        .populate("products.productId", "name description imageUrl");

    res.status(200).json({
        status: "success",
        results: orders.length,
        data: { orders },
    });
});

export const createOrder = catchAsync(async (req, res, next) => {
    const { products, paymentMethod } = req.body;
    const userId = req.user?.id;

    
    if (!userId) {
        return next(new Error("Authentication required"));
    }

    const isOrderExists = await Order.findOne({userId:userId})

    if(isOrderExists){
        const order = await Order.findOneAndUpdate(
            {_id:isOrderExists._id},
            { $push: { products: { $each: products } } },
            { new: true,runValidators: true }
        );

       return res.status(201).json({
            status: "success",
            data: { order },
        });
        
    }

    const order = await Order.create({
            userId,
            products,
            paymentMethod 
        });

    res.status(201).json({
            status: "success",
            data: { order },
        });
    
});

export const updateOrder = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { products, paymentMethod } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        return next(new Error("Authentication required"));
    }

    const order = await Order.findOneAndUpdate(
        { _id: id, userId },
        { products, paymentMethod },
        { new: true, runValidators: true }
    )

    if (!order) {
        return next(new Error("No order found with that ID or invalid data sent"));
    }

    res.status(200).json({
        status: "success",
        data: { order },
    });
});

export const deleteOrder = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
        return next(new Error("Authentication required"));
    }

    const order = await Order.findOneAndDelete({ _id: id });

    if (!order) {
        return next(new Error("No order found with that ID"));
    }

    res.status(204).json({
        status: "success",
        data: "deleted success",
    });
});