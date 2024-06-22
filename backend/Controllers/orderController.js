import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @Description  Create new order
// @route        POST /api/orders
// @access       Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    total,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = await Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      total,
    });
    // add created order to the database
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @Description  Get Logged in user Order
// @route        POST /api/orders/myorders
// @access       Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// view products ordered
const viewProductsOrdered = asyncHandler(async (req, res) => {
  const order = await Order.find({ _id: req.params.id });
  console.log(order);
  if (!order) {
    res.status(400).json({ message: "Resource not found" });
  }
  res.status(200).json(order);
});
// @Description  Get order by ID
// @route        GET /api/orders/:id
// @access       Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  // Add a property user to the order from the user model, selecting only values of names and email.

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(400);
    throw new Error("Order not found");
  }
});

// @Description  Update order to paid
// @route        PUT /api/orders/:id/pay
// @access       Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      updated_time: req.body.updated_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(400);
    throw new Error("Order not found!");
  }
});

// @Description  Update order to delivered
// @route        PUT /api/orders/:id/delivered
// @access       Private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("Update Order to delivered");
});

// @Description  Get all orders
// @route        POST /api/orders
// @access       Private/Admin

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  viewProductsOrdered,
  updateOrderToPaid,
};
