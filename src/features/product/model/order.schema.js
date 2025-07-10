import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        productName: String,
        price: Number,
      },
    ],
    totalPrice: Number,
    serviceTax: {
      type: Number,
      default: 0.08,
      min: 0.05,
      max: 0.12,
    },
    orderType: {
      type: String,
      required: true,
      enum: ["PRE", "POST"],
    },
    delivery: {
      type: String,
      default: "Deliver",
      enum: ["Self", "Deliver"],
    },
    shippingCharges: {
      type: Number,
      required: true,
    },
    finalPrice: {
      type: Number,
    },
    orderStatus: {
      type: String,
      default: "Processing",
      enum: [
        "Processing",
        "Packed",
        "Dispatched",
        "Incoming",
        "Delivered",
        "Received",
        "Cancelled",
      ],
    },
    paymentMode: {
      type: "String",
      default: "UPI",
      enum: ["CASH", "UPI"],
    },
    paymentStatus: {
      type: String,
      default: "Unpaid",
      enum: ["Paid", "Unpaid"],
    },
  },
  {
    timestamps: true,
  }
);

export default OrderModel = mongoose.model("Order", orderSchema);
