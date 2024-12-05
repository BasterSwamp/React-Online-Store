import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: [],
    cart: JSON.parse(sessionStorage.getItem("cart")) || [],
    isLoading: false,
  },
  reducers: {
    addItemToCart: (state, { payload }) => {
      const found = state.cart.find(
        ({ id, size }) => id === payload.id && size === payload.size
      );

      if (found) {
        state.cart = state.cart.map((item) =>
          item.id === payload.id && item.size === payload.size
            ? { ...item, quantity: payload.quantity }
            : item
        );
      } else {
        state.cart.push({ ...payload });
      }
      sessionStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeItemFromCart: (state, { payload }) => {
      const { id, size } = payload;
      state.cart = state.cart.filter(
        (item) => item.id !== id || item.size !== size
      );
      sessionStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { addItemToCart, removeItemFromCart } = userSlice.actions;
export default userSlice.reducer;
