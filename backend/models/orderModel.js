import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      qty: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],
  shippingAddress: {
    location: {
      type: String,
      required: true,
    },
    tell: {
      type: Number,
      required: true,
    },
    
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  // paymentResult: {
  //   id: { type: String, required: true },
  //   status : {type: String, required: true},
  //   update_time : {type: String, required: true},
  //   email: {type: String, required: true}
  // },
  itemsPrice : {
    type : Number,
    required : true,
    default : 0.0
  },
  taxPrice : {
    type : Number,
    required : true,
    default : 0.0
  },
  shippingPrice : {
    type : Number,
    required : true,
    default : 0.0
  },
  total :  {
    type : Number,
    required : true,
    default : 0.0
  },
  isPaid :  {
    type : Boolean,
    required : true,
    default : false
  },
  paidAt :  {
    type : Date,
  },
  isDelivered : {
    type : Boolean,
    required : true,
    default : false
  },
  deliveredAt : {
    type : Date
  }
}, {
    timestamps : true
});

const Order = mongoose.model("Order", orderSchema);
export default Order;