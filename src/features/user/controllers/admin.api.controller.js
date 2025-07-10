import { BECOME_ADMIN_PASS } from "../../../config/env.js";
import { firstAdminRegisterHTML } from "../../../utilities/emails/templates/admin/firstAdminRegister.js";
import UserRepository from "../models/user.repository.js";

export default class AdminApiController {
  constructor() {
    this.adminRepository = new UserRepository();
  }

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
    const response = await this.adminRepository.registerAdminRepo(req.body);
    if (response.success) {
      await sendMailWrapperFunction({
        receiver: response.firstAdmin.email,
        subject: "Main Admin Registration Successful",
        html: firstAdminRegisterHTML(response.firstAdmin),
      });

      return res.status(200).send(response);
    }
    return res.status(response.error.statusCode).send(response);
  };

  loginAdmin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      next(
        new CustomError(400, "You must be logged In to access this feature")
      );
    }
    const user = await this.userRepository.findUserByEmailRepo(email);
    if (!user) {
      return next(new CustomError(400, "This Email is not registered"));
    }

    if (user.role === "user") {
      return next(new CustomError(400, "Not a proper way to login"));
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

  addAdmin = async (req, res, next) => {};

  removeUser = async (req, res, next) => {};

  transferPower = async (req, res, next) => {};
}
