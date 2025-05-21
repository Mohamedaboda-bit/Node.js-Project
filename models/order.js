import mongoose  from "mongoose";
import Product from "./product.js";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required for order']
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required in order']
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1']
    }
  }],
  paymentMethod: {
    type: String,
    enum: ['CashOnDelivery', 'Stripe', 'PayPal'],
    default: 'CashOnDelivery'
  }
},{ timestamps: true });

orderSchema.pre('save', async function(next) {
  for (const item of this.products) {
    const exists = await Product.exists({ _id: item.productId });
    if (!exists) {
      return next(new Error(`Product with ID ${item.productId} does not exist.`));
    }
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);
export default Order;


