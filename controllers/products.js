const request = require("request");
const User = require("../models/users");

const rootURL = "https://api.edamam.com/api/food-database/v2/parser?ingr=";
const api_id = process.env.edamam_app_id;
const api_key = process.env.edamam_app_key;
let productData;

const index = (req, res, next) => {
  const product = req.query.ingr;
  if (product) {
    myUrl = `${rootURL}${product}&app_id=${api_id}&app_key=${api_key}`;
    request(myUrl, function (err, response, body) {
      if (err) return err;
      const bodyData = JSON.parse(body);
      if (bodyData.parsed.length > 0) {
        productData = bodyData.parsed[0].food;
        productData.category = 10;
        res.render("groceries/index", {
          title: "Product",
          user: req.user,
          productData: productData,
          success: req.flash("success"),
        });
      } else {
        req.flash("success", "We currently do not sell that product yet");
        res.render("groceries/index", {
          title: "Search the grocery item you desire",
          user: req.user,
          productData: productData,
          success: req.flash("success"),
        });
      }
    });
  } else {
    res.render("groceries/index", {
      title: "Welcome to your Local Store, what grocery item do you desire?",
      user: req.user,
      productData: productData,
      success: req.flash("success"),
    });
  }
};

const addToCart = (req, res, next) => {
  if (req.user) {
    let newProduct = {
      foodId: productData.foodId,
      label: productData.label,
      price: productData.category,
      image: productData.image,
    };
    User.findById(req.user.id, function (err, user) {
      if (err) return err;
      user.shoppingcart.push(newProduct);
      user.save(function (err) {
        req.flash("success", "Cart Successfully Updated");
        res.redirect("/");
      });
    });
  } else {
    req.flash("success", "Please login first");
    res.redirect("/");
  }
};

module.exports = {
  index,
  addToCart,
};
