import { catchAsync } from "../Utlites/wrapperFunction.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = catchAsync(async (req, res, next) => {
    const { name, email, password, UserType } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new Error("User with this email already exists"));
    }

    const user = await User.create({
        name,
        email,
        password,
        UserType: UserType || "customer",
    });


    res.status(201).json({
        status: "success",
        data: { user: { id: user._id, name, email, UserType } },
    });
});

export const Login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new Error("Invalid email or password"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new Error("Invalid email or password"));
    }

    const token = jwt.sign({ id: user._id,role:user.UserType }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.status(200).json({
        status: "success",
        data: { user: { id: user._id, name: user.name, email, UserType: user.UserType }, token },
    });
});

export const Reset_password = catchAsync(async (req, res, next) => {
    const { email,password, newPassword } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new Error("No user found with that email"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new Error("Invalid email or password"));
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
        status: "success",
        message: "Password reset successfully",
    });
});

export const Update_user = catchAsync(async (req, res, next) => {
    const { name, email } = req.body;
    const userId = req.user.id;

    if (!userId) {
        return next(new Error("Authentication required"));
    }

    const user = await User.findByIdAndUpdate(
        userId,
        { name, email },
        { new: true, runValidators: true }
    );

    if (!user) {
        return next(new Error("No user found with that ID"));
    }

    res.status(200).json({
        status: "success",
        data: { user },
    });
});

export const Delete_user = catchAsync(async (req, res, next) => {
    const userId = req.user.id;

    if (!userId) {
        return next(new Error("Authentication required"));
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
        return next(new Error("No user found with that ID"));
    }

    res.status(204).json({
        status: "success",
        data: "user deleted successfully",
    });
});