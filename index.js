import express from "express";
import cookieParser from "cookie-parser";
import expressEjsLayouts from "express-ejs-layouts";
import { PORT } from "./src/config/env.js";
import { connectToDbMongoose } from "./src/config/dbMongoose.js";
import loggerMiddleware from "./src/middlewares/logger.js";
import { authenticator } from "./src/middlewares/authentication.js";
import { handleUndefinedRouteMain } from "./src/middlewares/undefinedRoute.js";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandler.js";
import webRouter from "./src/routes/web.js";
import apiRouter from "./src/routes/api.js";

const app = express();
const Port = PORT;
app.use(cookieParser());
// Set view engine
app.set("view engine", "ejs");
// Set views directory
app.set("views", "src/views");
// Static files (CSS, JS, images)
app.use(express.static("public"));
app.use(expressEjsLayouts);
app.set("layout", "layouts/nulluser"); // Default layout
app.use(authenticator);
app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.render("pages/nullUser/home.ejs");
});
app.get("/about-us", (req, res) => {
  res.render("pages/nullUser/aboutus.ejs");
});

app.use("/web", webRouter);
app.use("/api", apiRouter);
app.use(handleUndefinedRouteMain);
app.use(errorHandlerMiddleware);

app.listen(Port, () => {
  connectToDbMongoose();
  console.log(`Server Running on http://localhost:${Port}`);
});
