import { Router } from "express";

const webRouter = Router();

webRouter.get("/", (req, res) => {
  res.send("Working web route");
});

export default webRouter;
