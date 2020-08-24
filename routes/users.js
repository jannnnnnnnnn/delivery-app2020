var express = require("express");
var router = express.Router();
const usersCtrl = require("../controllers/users");
const ordersCtrl = require("../controllers/orders");

/* GET users listing. */
router.get("/account", usersCtrl.profileShow);
router.post("/account", usersCtrl.profileUpdate);
router.get("/", usersCtrl.index);

router.get("/delivery", usersCtrl.deliveryShow);
router.post("/delivery", usersCtrl.deliveryUpdate);
router.get("/shoppingcart", usersCtrl.cartShow);
router.get("/shoppingcart/checkout", ordersCtrl.createOrder);
router.get("/orders", ordersCtrl.show);
router.delete("/shoppingcart/:id", usersCtrl.deleteShoppingcartItem);
router.delete("/delivery/:id", usersCtrl.deleteDeliverySlot);
router.get("/orders/:id", ordersCtrl.assignDriver);
router.get("/deliverystatus/:id", ordersCtrl.deliveryStatus);
module.exports = router;
