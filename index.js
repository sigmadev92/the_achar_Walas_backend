import express from "express";
import { PORT } from "./src/config/env.js";
import { connectToDbMongoose } from "./src/config/dbMongoose.js";
import loggerMiddleware from "./src/middlewares/logger.js";
const app = express();
const Port = PORT;
app.use(loggerMiddleware);
app.get("/", (req, res) => {
  res.send("The Achar Walas");
});
app.listen(Port, () => {
  connectToDbMongoose();
  console.log(`Server Running on http://localhost:${Port}`);
});
