import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5600;
const USER_MAIL = process.env.SMTP_USER_MAIL;
const USER_PASS = process.env.SMTP_USER_PASS;
const JWT_SECRET = process.env.JWT_SECRET;
export { MONGO_URI, PORT, USER_MAIL, USER_PASS, JWT_SECRET };
