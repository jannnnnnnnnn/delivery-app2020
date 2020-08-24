const User = require("../models/users");
const sameDeliverytime = require("../config/utilities").sameDeliverytime;
const sortDeliverytimes = require("../config/utilities").sortDeliverytimes;

const profileShow = (req, res, next) => {
  res.render("groceries/account", {
    title: "Update your Account",
    user: req.user,
    success: req.flash("success"),
  });
};

const deliveryShow = (req, res, next) => {
  User.findById(req.user.id, function (err, user) {
    if (err) return err;
    let deliverytimeSorted = sortDeliverytimes(user.deliverytimes);

    res.render("groceries/delivery", {
      title: "Update your Delivery Availability",
      user: req.user,
      deliverytimes: deliverytimeSorted,
      success: req.flash("success"),
    });
  });
};

//this function has issues
const index = (req, res, next) => {
  User.find({}, function (err, users) {
    if (err) return err;
    res.render("error", { message: "Please Sign in", title: "Error" });
  });
};
const profileUpdate = (req, res, next) => {
  User.findByIdAndUpdate(req.user.id, req.body, function (err, user) {
    if (err) return err;
    req.flash("success", "Profile Successfully Updated");
    res.redirect("/users/account");
  });
};

function deliveryUpdate(req, res, next) {
  User.findById(req.user.id, async function (err, user) {
    if (err) return err;
    let checkInput = sameDeliverytime(req.body, req.user);
    if (checkInput) {
      req.flash("success", "You already have this Delivery Timeslot");
      res.redirect("/users/delivery");
    } else {
      user.deliverytimes.push(req.body);
      await user.save(function (err) {
        if (err) return err;
        req.flash("success", "Delivery Successfully Updated");
        res.redirect("/users/delivery");
      });
    }
  });
}

const cartShow = (req, res, next) => {
  res.render("groceries/cart", {
    title: "Shopping Cart",
    user: req.user,
    success: req.flash("success"),
  });
};

const deleteShoppingcartItem = (req, res, next) => {
  User.findById(req.user.id, function (err, user) {
    if (err) return err;
    user.shoppingcart.id(req.params.id).remove();
    user.save(function (err) {
      if (err) return err;
      req.flash("success", "Cart Successfully Updated");
      res.redirect("/users/shoppingcart");
    });
  });
};
const deleteDeliverySlot = (req, res, next) => {
  User.findById(req.user.id, function (err, user) {
    if (err) return err;
    user.deliverytimes.id(req.params.id).remove();
    user.save(function (err) {
      if (err) return err;
      req.flash("success", "Delivery Slots Successfully Updated");
      res.redirect("/users/delivery");
    });
  });
};

module.exports = {
  profileShow,
  profileUpdate,
  index,
  deliveryShow,
  deliveryUpdate,
  cartShow,
  deleteShoppingcartItem,
  deleteDeliverySlot,
};
