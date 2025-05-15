import {catchAsync} from "../Utlites/wrapperFunction.js";
// import mongoose schemas here
import orderModel from "../models/order.js"
export const getAllOrders = catchAsync(async (req, res, next) => {
 let order = await orderModel.find()
    res.status(200).json({
        status: "success",
        data: order,
    });});

export const deleteOrder = catchAsync(async (req, res, next) => {

 const { id } = req.params;
        let order = await orderModel.findOneAndDelete({ _id: id });

        if (order) {
            res.status(200).json({
                status: "delete success",
                data: order,
            });
        } else {
            res.status(404).json({
                status: "failed",
                message: "order not found",
            });
        }
   


}); 
export const createOrder = catchAsync(async (req, res, next) => {
 let newOrder = req.body;

    const order = await orderModel.create(newOrder);

    res.status(201).json({
        status: "success",
        message: "saved successfully",
        data: order,
    })
   
});

export const updateOrder = catchAsync(async (req, res, next) => {
const { id } = req.params;
    const updateData = req.body;
        let order = await orderModel.findOneAndUpdate({ _id: id },
             { $set: updateData }, { new: true, runValidators: true });

        if (order) {
            res.status(200).json({
                status: "update succes",
                data: order,
            });
        } else {
            res.status(404).json({
                status: "failed",
                message: "Not find",
            });
        }


}); 
