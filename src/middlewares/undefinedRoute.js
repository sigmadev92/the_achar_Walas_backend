export const handleUndefinedRouteMain = (req, res, next) => {
  if (req.get("requestPath") === "api") {
    return res
      .status(404)
      .send({ success: false, message: "Reached undefined Route" });
  }
  //will render a vew here when setup ejs.
  return res.send("Route undefined");
};

export const handleUndefinedRouteAPI = (req, res, next) => {
  return res
    .status(400)
    .send({ success: false, message: "Reached undefined /api route" });
};

export const handleUndefinedRouteMVC = (req, res, next) => {
  console.log("s");
  //will render once EJS is setup
  //   return res.render()
};
