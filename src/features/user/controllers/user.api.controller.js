import UserRepository from "../models/user.repository.js";
import { CustomError } from "../../../middlewares/errorHandler.js";
import sendMailWrapperFunction from "../../../config/nodemailer.js";
import { userSignUpHtml } from "../../../utilities/emails/templates/users/userSignup.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  registerUser = async (req, res, next) => {
    if (!req.body) {
      return next(new CustomError(400, "Data missing"));
    }

    try {
      const response = await this.userRepository.addUserRepo(req.body);
      if (response.success) {
        //send the registration mail.
        await sendMailWrapperFunction({
          receiver: response.newCustomer.email,
          subject: "User Registration Successful",
          htmlContent: userSignUpHtml(response.newCustomer),
        });
        return res.status(201).send(response);
      }

      return res.status(response.error.statusCode).send(response);
    } catch (error) {
      console.log(error);

      return next(new CustomError(500, "Internal Server Error"));
    }
  };

  loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new CustomError(400, "Email and password are required"));
    }
    const user = await this.userRepository.findUserByEmailRepo(email);
    if (!user) {
      return next(new CustomError(400, "This Email is not registered"));
    }
    if (user.role === "admin") {
      return next(new CustomError(400, "Bad Login"));
    }

    const result = await user.comparePassword(password);
    if (result) {
      const token = user.generateJWTtoken();
      const cookieOptions = {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res
        .status(statusCode)
        .cookie("token", token, cookieOptions)
        .json({ success: true, user, token });
    }

    return res
      .status(400)
      .send({ success: false, message: "Worong credentials" });
  };

  updateProfilePic = async (req, res, next) => {};

  resetPassword = async (req, res, next) => {};

  updatePassword = async (req, res, next) => {};

  updateAddress = async (req, res, next) => {};

  deleteAccount = async (req, res, next) => {};
}
