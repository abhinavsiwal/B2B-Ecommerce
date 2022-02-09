import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState { 
  token: String;
  isLoggedIn:boolean;
  userDetails:{},
}

const initialState: UserState = {
  token: "",
  isLoggedIn:false,
  userDetails:{},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<String>) => {
      state.token = action.payload;
    },
    setIsLoggedIn:(state,action:PayloadAction<boolean>)=>{
      state.isLoggedIn=action.payload;
    },
    setUserDetails:(state,action:PayloadAction<{}>)=>{
      state.userDetails=action.payload;
    }
  },
});

export const { setToken,setIsLoggedIn,setUserDetails } = userSlice.actions;
export default userSlice.reducer;