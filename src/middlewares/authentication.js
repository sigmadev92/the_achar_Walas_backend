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
    if (req.requestType === "api")
      next(
        new CustomError(400, "You must be logged In to access this feature")
      );
    else return res.redirect("/web/user/login");
  }
};

//when user is trying to access registration, login or forgotpassword page when he is already logged in
export const preventExposed = (req, res, next) => {
  if (!req.user) {
    next();
  } else if (req.requestType === "api")
    next(new CustomError(400, "You are already Logged In."));
  else res.redirect("/api/user/");
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

export const isMasterAdmin = (req, res, next) => {
  if (req.user.firstAdmin) {
    return next();
  }
  next(new CustomError(400, "Only master Admin can access this feature"));
};
