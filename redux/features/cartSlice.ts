import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
  },
  reducers: {
    updateCart(state: any, action: any) {
      state.products = action.payload;
    },
  },
});

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;
