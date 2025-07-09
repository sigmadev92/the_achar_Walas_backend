import { Router } from "express";
import setLayoutinLocals from "../middlewares/setLayout.js";
import userWebRouter from "../features/user/routes/user.web.route.js";

const webRouter = Router();
webRouter.use(setLayoutinLocals);
webRouter.use("/user", userWebRouter);

export default webRouter;
