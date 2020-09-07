const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deliverytimesSchema = new Schema({
  date: Date,
  timeslot: Number,
});

const shoppingcartSchema = new Schema({
  foodId: String,
  label: String,
  price: Number,
  image: String,
});

const userSchema = new Schema(
  {
    googleId: String,
    firstname: { type: String, required: true },
    lastname: { type: String },
    address: { type: String },
    city: { type: String },
    postalcode: String,
    country: { type: String },
    store: String,
    shoppingcart: [shoppingcartSchema],
    //true=shopper & false=driver
    accounttype: { type: String, default: " " },
    deliverytimes: [deliverytimesSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
