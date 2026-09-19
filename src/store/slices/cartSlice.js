import { createSlice } from '@reduxjs/toolkit';

const initialPromoCodes = {
  KATYA: 0.15,
  EVA: 0.1,
  SUMMER25: 0.2,
};

const initialState = {
  items: [],
  isOpen: false,
  appliedCoupon: null,
  discountPercent: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const {
        id,
        title,
        price,
        discountedPrice,
        image,
        size = 'M',
        brand = '',
        type = '',
        stock = 99,
      } = action.payload;
      const unitPrice = discountedPrice || price || 25;
      const addQuantity = action.payload.quantity || 1;

      const existingIndex = state.items.findIndex((item) => item.id === id && item.size === size);

      if (existingIndex > -1) {
        const currentItem = state.items[existingIndex];
        const newTotalQuantity = currentItem.quantity + addQuantity;

        currentItem.quantity =
          newTotalQuantity > currentItem.stock ? currentItem.stock : newTotalQuantity;
      } else {
        const initialQuantity = addQuantity > stock ? stock : addQuantity;

        state.items.push({
          cartItemId: `${id}-${size}-${Date.now()}`,
          id,
          title,
          price: unitPrice,
          oldPrice: action.payload.oldPrice || price,
          image,
          size,
          brand,
          type,
          stock,
          quantity: initialQuantity,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.cartItemId !== action.payload && item.id !== action.payload,
      );
    },
    updateQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;
      const item = state.items.find((i) => i.cartItemId === cartItemId || i.id === cartItemId);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i !== item);
        } else {
          const maxStock = item.stock || 99;
          if (quantity > maxStock) {
            item.quantity = maxStock;
          } else {
            item.quantity = quantity;
          }
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.appliedCoupon = null;
      state.discountPercent = 0;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    applyCoupon: (state, action) => {
      const code = (action.payload || '').trim().toUpperCase();
      if (initialPromoCodes[code]) {
        state.appliedCoupon = code;
        state.discountPercent = initialPromoCodes[code];
      }
    },
    removeCoupon: (state) => {
      state.appliedCoupon = null;
      state.discountPercent = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
