import { Router } from "express";
import AdminApiController from "../controllers/admin.api.controller.js";
import {
  authByUserRole,
  isMasterAdmin,
  preventExposed,
  protectSensitive,
} from "../../../middlewares/authentication.js";
const adminApiRouter = Router();
const adminApiController = new AdminApiController();

adminApiRouter.post("/register", preventExposed, (req, res, next) => {
  adminApiController.registerAdmin(req, res, next);
});

adminApiRouter.post("/login", preventExposed, (req, res, next) => {
  adminApiController.loginAdmin(req, res, next);
});

// only main admin can do
adminApiRouter.post(
  "/add/new-admin",
  protectSensitive,
  isMasterAdmin,
  authByUserRole("admin"),
  (req, res, next) => {
    adminApiController.addAdmin(req, res, next);
  }
);

adminApiRouter.delete(
  "/delete/:userId",
  protectSensitive,
  authByUserRole("admin"),
  isMasterAdmin,
  (req, res, next) => {
    adminApiController.removeUser(req, res, next);
  }
);

adminApiRouter.put(
  "transfer/power/:adminId",
  protectSensitive,
  authByUserRole("admin"),
  isMasterAdmin,
  (req, res, next) => {
    adminApiController.transferPower(req, res, next);
  }
);
export default adminApiRouter;
