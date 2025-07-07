import { Router } from "express";
import setLayoutinLocals from "../middlewares/setLayout.js";

const webRouter = Router();
webRouter.use(setLayoutinLocals);
webRouter.get("/user/register", (req, res) => {
  res.render("pages/nullUser/register");
});

export default webRouter;
