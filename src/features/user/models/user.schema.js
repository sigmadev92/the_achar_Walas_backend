import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { JWT_EXPIRE, JWT_SECRET, SALT_ROUNDS } from "../../../config/env.js";
//creating user schema

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: [true, "email already registered"],
      validate: {
        validator: function (value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Please enter a valid email",
      },
    },

    password: {
      required: true,
      type: String,
    },
    phone: {
      type: String,
      required: true,
      unique: [true, "Phone number is already registered"],
      length: 10,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    firstAdmin: {
      type: Boolean,
      required: function () {
        return this.role === "admin";
      },
      default: false,
    },
    profilePic: {
      type: String,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserAddress",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hashedPassword = await bcrypt.hash(this.password, Number(SALT_ROUNDS));
  this.password = hashedPassword;
  next();
});

userSchema.methods.generateJWTtoken = function () {
  const token = jwt.sign(
    { id: this._id, name: this.name, role: this.role, pic: this.profilePic },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRE,
    }
  );
  return token;
};

// user password compare
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generatePasswordResetToken
userSchema.methods.getResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hashing and updating user resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
