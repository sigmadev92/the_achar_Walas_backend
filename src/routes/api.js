import { Router } from "express";
import userApiRouter from "../features/user/routes/user.api.routes.js";
import adminApiRouter from "../features/user/routes/admin.api.routes.js";
import productApiRouter from "../features/product/routes/product.api.routes.js";

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.status(200).send("working");
});

apiRouter.use("/user", userApiRouter);
apiRouter.use("/admin", adminApiRouter);
apiRouter.use("/product", productApiRouter);
export default apiRouter;
