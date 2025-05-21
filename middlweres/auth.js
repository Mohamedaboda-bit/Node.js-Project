import { catchAsync } from "../Utlites/wrapperFunction.js";
import jwt from "jsonwebtoken";

export const protect = catchAsync(async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return next(new Error("Authentication required: No token provided"));
    }
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);

        req.user = { id: decoded.id };

        next();
});


export const customer = catchAsync(async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return next(new Error("Authentication required: No token provided"));
    }
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    if(decoded.role != "customer"){
        return next(new Error("sellers and guests can't make,edit,get or remove orders"));
    }
        req.user = { id: decoded.id };

        next();
});

export const seller = catchAsync(async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return next(new Error("Authentication required: No token provided"));
    }
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    if(decoded.role != "seller"){
        return next(new Error("you must be a seller to access this route"));
    }

    req.user = { id: decoded.id, role:decoded.role };

    next();
});