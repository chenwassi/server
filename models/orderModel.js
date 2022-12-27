const mongoose = require("mongoose");

const orderModel = new mongoose.Schema(
  {
    stores: [
      {
        storId: { type: mongoose.SchemaTypes.ObjectId, ref: "store" },
        productsDetails: [{ productId:  { type: mongoose.SchemaTypes.ObjectId, ref: "product" }, quantity: Number }],
      },
    ],
    address: String,
    date: { type: String, default: Date.now },
    price: Number,
    clientId: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  },
  { versionKey: false }
);

module.exports = mongoose.model("order", orderModel);
