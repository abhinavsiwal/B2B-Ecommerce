import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface productsState{
    products:[{}],
}

const  initialState:productsState={
    products:[{}],
}

export const productsSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        setProducts:(state,action:PayloadAction<[{}]>)=>{
            state.products=action.payload;
        },
    }
})

export const {setProducts} = productsSlice.actions;
export default productsSlice.reducer;