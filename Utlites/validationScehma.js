import Joi from "joi";
import mongoose from "mongoose";

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
  UserType: Joi.string().valid("customer", "seller").optional()
});


// export const addProductSchema = Joi.object({
//   name: Joi.string().min(2).max(100).required(),
//   description: Joi.string().min(5).max(1000).required(),
// });


export const createOrderSchema = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string()
          .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
              return helpers.error("any.invalid");
            }
            return value;
          }, "ObjectId Validation")
          .required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),
  paymentMethod: Joi.string().valid("CashOnDelivery", "Stripe", "PayPal").required(),
});