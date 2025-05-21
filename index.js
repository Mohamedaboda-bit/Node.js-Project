import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.js';
import productRouter from './routes/product.js';
import orderRouter from './routes/order.js';
import sellerRouter from './routes/seller.js';
import mongoose from 'mongoose';
import cors from 'cors';
import AppError from './Utlites/AppError.js';

dotenv.config();
const app = express();

app.use(cors({
    origin: '*', 
}));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Error connecting to MongoDB", err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/seller", sellerRouter);

app.use( (req, res,next) => {
  next(new AppError(`${req.originalUrl} is not found `, 404));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      message: err.message || 'Internal Server Error',
  });
});

