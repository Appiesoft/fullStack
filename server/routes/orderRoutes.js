const express = require("express");
const router = express.Router();
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderControllers");
const { isAuthenticatedUser, authorizedRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

//for admin
router.route("/orders").get(isAuthenticatedUser,authorizedRoles('admin'), getAllOrders);
router.route("/order/:id").put(isAuthenticatedUser,authorizedRoles('admin'), updateOrder);
router.route("/order/:id").delete(isAuthenticatedUser,authorizedRoles('admin'), deleteOrder);
module.exports = router;