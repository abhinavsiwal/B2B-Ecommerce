import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ordersState{
    orders:[{}],
}

const  initialState:ordersState={
    orders:[{}],
}

export const ordersSlice=createSlice({
    name:"orders",
    initialState,
    reducers:{
        setOrders:(state,action:PayloadAction<[{}]>)=>{
            state.orders=action.payload;
        },
    }
})

export const {setOrders} = ordersSlice.actions;
export default ordersSlice.reducer;