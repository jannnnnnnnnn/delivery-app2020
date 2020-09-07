const User = require("../models/users");
const Order = require("../models/orders");

const sortDeliverytimes = require("../config/utilities").sortDeliverytimes;
const sameDeliverytime = require("../config/utilities").sameDeliverytime;

const show = (req, res, next) => {
  User.findById(req.user.id, function (err, user) {
    //code: if is a shopper do this
    if (user.accounttype == "Driver") {
      Order.find({ driver: user.id }, function (err, order) {
        if (err) return err;
        res.render("groceries/orders", {
          title: "Orders needed your Delivery",
          user: req.user,
          orders: order,
          success: req.flash("success"),
        });
      });
    } else {
      Order.find({ shopper: user.id }, function (err, order) {
        if (err) return err;
        res.render("groceries/orders", {
          title: "List of Your Orders",
          user: req.user,
          orders: order,
          success: req.flash("success"),
        });
      });
    }
  });
};

const createOrder = (req, res, next) => {
  User.findById(req.user.id, function (err, user) {
    if (err) return err;
    if (user.accounttype != " ") {
      let total = 0;
      req.user.shoppingcart.forEach(function (product) {
        total = total + product.price;
      });
      let newInput = {
        store: user.store,
        address: user.address,
        city: user.city,
        postalcode: user.postalcode,
        country: user.country,
        status: false,
        products: user.shoppingcart,
        subtotal: total,
      };
      const newOrder = new Order(newInput);
      if (user.accounttype == "Shopper") {
        newOrder.shopper = req.user.id;
        newOrder.driver = req.user.id;
        newOrder.save(function (err) {
          if (err) return err;
          req.flash("success", "Success! Order Created");
          res.redirect("/users/orders");
        });
      } else {
        req.flash("success", "Failed! You need to be a Shopper to Check Out");
        res.redirect("/users/orders");
      }
    } else {
      req.flash(
        "success",
        "Please complete your profile first before order checkout."
      );
      res.redirect("/users/account");
    }
  });
};

async function assignDriver(req, res, next) {
  let today = new Date();
  today.setDate(today.getDate() + 1);
  let requestedDeliverytimes = [];
  let sortedDeliverytimes = sortDeliverytimes(req.user.deliverytimes);
  for (const sortedDeliverytime of sortedDeliverytimes) {
    if (today.getTime() - sortedDeliverytime.date.getTime() <= 0) {
      requestedDeliverytimes.push(sortedDeliverytime);
    }
  }

  try {
    if (requestedDeliverytimes.length > 0) {
      let foundDriver;
      let drivers = await User.find({ accounttype: "Driver" });

      //1
      for (const requestedDeliverytime of requestedDeliverytimes) {
        for (const driver of drivers) {
          if (sameDeliverytime(requestedDeliverytime, driver)) {
            let order = await Order.findById(req.params.id);

            order.driver = driver.id;
            order.deliveryDate.push(requestedDeliverytime);
            let result = await order.save();
            req.flash("success", "Success! We found your driver");
            foundDriver = true;
            return res.redirect("/users/orders");
          }
        }
      }
      //2
      if (!foundDriver) {
        req.flash(
          "success",
          "Sorry, we cannot find a driver, please choose a different timeslot"
        );
        res.redirect("/users/delivery");
      }
    } else {
      req.flash(
        "success",
        "Please select a delivery slot at least 2 days from now"
      );
      res.redirect("/users/delivery");
    }
  } catch (error) {
    res.render("error", { message: "Please Sign in", title: "Error" });
  }
}

const deliveryStatus = (req, res, next) => {
  Order.findById(req.params.id, function (err, order) {
    if (err) return err;
    order.status = true;
    order.save(function (err) {
      if (err) return err;
      req.flash("success", "Delivery Status Updated");
      res.redirect("/users/orders");
    });
  });
};

module.exports = {
  createOrder,
  show,
  assignDriver,
  deliveryStatus,
};
