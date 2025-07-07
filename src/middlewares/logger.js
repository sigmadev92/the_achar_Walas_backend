//You can later use winston-logger here or make a separate file in src/middlewares
import fs from "fs";
// We will export the default function.

export default function loggerMiddleware(req, res, next) {
  //   console.log(req.url, req.path);
  let displayString = `On ${new Date().toDateString()} at ${new Date().toTimeString()} ${
    req.url
  } ${req.method} \n\n`;

  //   console.log(displayString);
  fs.appendFileSync("./logger.log", displayString);
  next();
}
