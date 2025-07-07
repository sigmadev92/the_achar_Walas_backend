import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./src/config/env.js";
import { connectToDbMongoose } from "./src/config/dbMongoose.js";
import loggerMiddleware from "./src/middlewares/logger.js";
import { handleUndefinedRouteMain } from "./src/middlewares/undefinedRoute.js";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandler.js";
const app = express();
const Port = PORT;
app.use(cookieParser());
app.use(loggerMiddleware);
app.get("/", (req, res) => {
  res.send("The Achar Walas");
});

app.use(handleUndefinedRouteMain);
app.use(errorHandlerMiddleware);
app.listen(Port, () => {
  connectToDbMongoose();
  console.log(`Server Running on http://localhost:${Port}`);
});
