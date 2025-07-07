import jwt from "jsonwebtoken";
import { CustomError } from "./errorHandler.js";
import { JWT_SECRET } from "../config/env.js";
export const authenticator = (req, res, next) => {
  const token = req.cookies["achar_walasToken"];
  if (token) {
    const result = jwt.verify(token, JWT_SECRET);
    if (result) {
      console.log(result);
      req.user = result;
      return next();
    }
  }
  req.user = null;
  next();
};

export const protectSensitive = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    next(new CustomError(400, "You must be logged In to access this feature"));
  }
};

//when user is trying to access registration, login or forgotpassword page when he is already logged in
export const PreventExposed = (req, res, next) => {
  if (!req.user) {
    next();
  } else {
    next(new CustomError(400, "You are already Logged In."));
  }
};

//for admin routes - access to admin; For user routes - access to users
//like admin can't create order
// like user cannot see admin dahsboard
export const authByUserRole = (role) => {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else next(new CustomError(400, "You cannot access this feature"));
  };
};
