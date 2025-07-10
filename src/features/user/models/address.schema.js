import mongoose from "mongoose";

const userAddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  houseNumber: {
    type: String,
    required: true,
  },
  areaName: {
    type: String,
    required: true,
  },
  blockName: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
    length: 6,
  },
});

const UserAddressModel = mongoose.model("UserAddress", userAddressSchema);

export default UserAddressModel;
