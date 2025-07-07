export default function setLayoutinLocals(req, res, next) {
  let layout = "layouts";
  let end = "";
  if (!req.user) {
    end = "nulluser";
  } else if (!req.user.role === "admin") {
    end = "admin";
  } else end = "customer";

  res.locals.layout = `${layout}/${end}`;
  next();
}
