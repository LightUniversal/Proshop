import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../Utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => {
        return x._id === item._id;
      });

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // state is ready only. It is imutable, hence we don't use .push();
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x)=> {
        return x._id !== action.payload
      });

      return updateCart(state);
    },
    saveShippingAddress: (state, action)=> {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePayment: (state, action) => {
      state.savePaymentMethod = action.payload;
      return updateCart(state);
    },
    // clear CartItems once the order is created
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    }
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePayment, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
