import { createSlice } from "@reduxjs/toolkit";

const RequestsSlice=createSlice({
    name:"requests",
    initialState:null,
    reducers:
    {
        addrequests:(state,action)=>{
            return action.payload;
        },
        removeReq:(state,action)=>
        {
            const newReq=state.filter((r)=>r._id!==action.payload);
            return newReq;
        }
    }
});
export const{addrequests,removeReq}=RequestsSlice.actions;
export default RequestsSlice.reducer;