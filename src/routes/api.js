import { Router } from "express";

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.status(200).send("working");
});

export default apiRouter;
