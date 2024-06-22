import express from "express";
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid,
    viewProductsOrdered,
} from "../Controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get( protect, admin, getOrders).post(protect, addOrderItems);

router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
// router.route('/:id/').get(protect, viewProductsOrdered);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/delivered').put(protect, admin, updateOrderToDelivered);


export default router;