 // create a helper function
export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
    // calculate total price of items in the cart
    state.itemsPrice = addDecimal(
        state.cartItems.reduce(
          (cur, nextItem) => cur + nextItem.price * nextItem.qty,
          0
        )
      );

      // calculate the shipping price. If the price is > $100 then free, else $10 shipping
      state.shippingPrice = addDecimal(state.itemsPrice > 500 ? 0 : 0);

      // tax price
      state.taxPrice = addDecimal(Number(0.0 * state.itemsPrice).toFixed(2));

      // total price
      state.total = (
        Number(state.taxPrice) +
        Number(state.shippingPrice) +
        Number(state.itemsPrice)
      ).toFixed(2);

      // store to the localstorage
      localStorage.setItem("cart", JSON.stringify(state));
      return state;
}