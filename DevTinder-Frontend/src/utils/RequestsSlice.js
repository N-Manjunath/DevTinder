import { createSlice } from "@reduxjs/toolkit";

const RequestsSlice=createSlice({
    name:"requests",
    initialState:null,
    reducers:
    {
        addrequests:(state,action)=>{
            return action.payload;
        }
    }
});
export const{addrequests}=RequestsSlice.actions;
export default RequestsSlice.reducer;