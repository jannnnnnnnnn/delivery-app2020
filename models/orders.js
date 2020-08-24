const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  foodId: String,
  label: String,
  price: Number,
  image: String,
});

const deliveryDateSchema = new Schema({
  date: Date,
  timeslot: Number,
});

const orderSchema = new Schema(
  {
    store: { type: String, required: true },
    products: { type: [productSchema] },
    totalCost: Number,
    address: { type: String },
    city: { type: String },
    postalcode: { type: String },
    country: { type: String },
    // true= delivered, false = in process
    status: { type: Boolean, default: false },
    subtotal: Number,
    shopper: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    deliveryDate: [deliveryDateSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
