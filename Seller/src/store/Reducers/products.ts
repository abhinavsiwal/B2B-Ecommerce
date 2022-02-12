import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface collectionsState{
    products:[{}],
}

const  initialState:collectionsState={
    products:[{}],
}

export const productsSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        setCollections:(state,action:PayloadAction<[{}]>)=>{
            state.products=action.payload;
        },
    }
})

export const {setCollections} = productsSlice.actions;
export default productsSlice.reducer;