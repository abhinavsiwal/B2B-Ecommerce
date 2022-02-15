import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface itemState {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
  inStock: boolean;
  seller:string;
  product:string,
}

interface cartState {
  cartItems: [];
  cartTotalQuantity: Number;
  cartTotalAmount: Number;
  shippingInfo:{};
}

const initialState: cartState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  shippingInfo:{},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemsToCart: (state, action: PayloadAction<itemState>) => {
      console.log(action.payload);
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<{}>) => {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartItems;
    },
    decreaseCart: (state, action: PayloadAction<{}>) => {
      console.log(action.payload);

      const itemIndex = state.cartItems.findIndex(
        (cartItem: any) => cartItem.id === action.payload.id
      );
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      } else if (state.cartItems[itemIndex].quantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
      }
    },
    increaseCart: (state, action: PayloadAction<{}>) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem: any) => cartItem.id === action.payload.id
      );

      if (state.cartItems[itemIndex].quantity <= action.payload.stock) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        state.cartItems[itemIndex].inStock = false;
        return;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    getTotal: (state) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
    setShippingInfo:(state, action: PayloadAction<{}>)=>{
      state.shippingInfo=action.payload;
    }
  },
});

export const {
  addItemsToCart,
  removeFromCart,
  decreaseCart,
  increaseCart,
  clearCart,
  getTotal,
  setShippingInfo
} = cartSlice.actions;
export default cartSlice.reducer;
