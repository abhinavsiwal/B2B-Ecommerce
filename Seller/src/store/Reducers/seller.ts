import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SellerState { 
  sellerToken: String;
  isLoggedIn:boolean;
  sellerDetails:{},
}

const initialState: SellerState = {
  sellerToken: "",
  isLoggedIn:false,
  sellerDetails:{},
};

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<String>) => {
      state.sellerToken = action.payload;
    },
    setIsLoggedIn:(state,action:PayloadAction<boolean>)=>{
      state.isLoggedIn=action.payload;
    },
    setSellerDetails:(state,action:PayloadAction<{}>)=>{
      state.sellerDetails=action.payload;
    }
  },
});

export const { setToken,setIsLoggedIn,setSellerDetails } = sellerSlice.actions;
export default sellerSlice.reducer;