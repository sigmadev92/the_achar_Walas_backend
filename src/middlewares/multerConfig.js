import multer from "multer";

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    let location = "others";
    if (file.mimetype.split("/")[0] === "image") {
      if (req.imageType === "product") location = "images/product_pics";
      else location = "images/user_pics";
    }
    cb(null, `/public/uploads/${location}`);
  },
  filename: function (req, file, cb) {
    let filename =
      file.originalname.replaceAll(" ", "_") +
      new Date().toISOString().replaceAll(":", "-");
    cb(null, filename);
  },
});

const multerStorage = multer({ storage: storageConfig });
export default multerStorage;
