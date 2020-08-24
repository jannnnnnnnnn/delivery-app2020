var express = require("express");
var router = express.Router();
const passport = require("passport");
const productsCtrl = require("../controllers/products");

/* GET home page. */
router.get("/", productsCtrl.index);
router.post("/", productsCtrl.addToCart);

// Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/users/account",
    failureRedirect: "/users",
  })
);

// OAuth logout route
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
