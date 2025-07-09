export class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    if (req.requestType === "api")
      return res
        .status(err.statusCode)
        .send({ success: false, message: err.message });
  }
  return res.status(500).send({ success: false, message: err.message });
};
