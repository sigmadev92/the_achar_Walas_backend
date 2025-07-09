import { Router } from "express";
import {
  preventExposed,
  protectSensitive,
} from "../../../middlewares/authentication.js";
import UserController from "../controllers/user.controller.js";
const userController = new UserController();
const userWebRouter = Router();

userWebRouter.get("/register", preventExposed, (req, res) => {
  res.render("pages/nullUser/register");
});

userWebRouter.get("/login", preventExposed, (req, res) => {
  res.render("pages/nullUser/login");
});

userWebRouter.get("/password/forgot", preventExposed, (req, res) => {
  res.render("pages/nullUser/forgot-password");
});

userWebRouter.get("/password/update", protectSensitive, (req, res) => {
  res.render("pages/nullUser/update-password");
});

userWebRouter.post("/register", (req, res, next) => {
  userController.registerUser(req, res, next);
});

export default userWebRouter;
