import UserRepository from "../models/user.repository.js";
import { CustomError } from "../../../middlewares/errorHandler.js";
import sendMailWrapperFunction from "../../../config/nodemailer.js";
import { userSignUpHtml } from "../../../utilities/emails/templates/users/userSignup.js";
import { BECOME_ADMIN_PASS } from "../../../config/env.js";
import { firstAdminRegisterHTML } from "../../../utilities/emails/templates/admin/firstAdminRegister.js";
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
        if (req.requestType === "api") return res.status(201).send(response);
        else
          return res.render("pages/nullUser/login", {
            success: "User Registration successful. Please Login",
          });
      }
      if (req.requestType === "api") {
        return res.status(response.error.statusCode).send(response);
      }
      return res.render("pages/nullUser/register", {
        errors: [response.error.msg],
      });
    } catch (error) {
      console.log(error);
      if (req.requestType === "web") {
        return res.render("pages/nullUser/register", {
          errors: [error.message],
        });
      }
      return next(new CustomError(500, "Internal Server Error"));
    }
  };

  //admin routes
  registerAdmin = async (req, res, next) => {
    if (!req.body) {
      return next(new CustomError(400, "Data missing"));
    }
    if (!req.body.secretPass) {
      return next(new CustomError(400, "Admin Pass is missing"));
    }
    if (req.body.secretPass !== BECOME_ADMIN_PASS) {
      return next(
        new CustomError(
          400,
          "You can not register as admin. Your Security code is Wrong"
        )
      );
    }
    req.body.role = "admin";
    const response = await this.userRepository.registerAdminRepo(req.body);
    if (response.success) {
      await sendMailWrapperFunction({
        receiver: response.firstAdmin.email,
        subject: "Main Admin Registration Successful",
        html: firstAdminRegisterHTML(response.firstAdmin),
      });
      if (req.requestType === "web") {
        return res.render("pages/nullUser/login", {
          success: "Admin Registration successful. Please login to continue.",
        });
      }
      return res.status(200).send(response);
    }
    if (req.requestType === "api") {
      return res.status(response.error.statusCode).send(response);
    }
    res.render("pages/nullUser/register", { errors: [response.error.msg] });
  };

  addAdmin = async (req, res, next) => {};

  // can remove both admin and other admin
  // Other admins can not remove someone
  //only first admin can consume this controller
  removeUser = async (req, res, next) => {};
}
